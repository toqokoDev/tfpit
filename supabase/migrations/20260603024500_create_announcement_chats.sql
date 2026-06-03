create extension if not exists pgcrypto;

create table if not exists public.announcement_chats (
  id uuid primary key default gen_random_uuid(),
  announcement_id uuid not null references public.announcements(id) on delete cascade,
  owner_id uuid not null references public.users(id) on delete cascade,
  applicant_id uuid not null references public.users(id) on delete cascade,
  status text not null default 'pending',
  initial_message text not null default '',
  last_message_at timestamptz,
  last_message_sender_id uuid references public.users(id) on delete set null,
  owner_last_read_at timestamptz,
  applicant_last_read_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint announcement_chats_status_check check (status in ('pending', 'accepted', 'rejected', 'archived')),
  constraint announcement_chats_distinct_users_check check (owner_id <> applicant_id)
);

create unique index if not exists announcement_chats_announcement_applicant_unique
  on public.announcement_chats (announcement_id, applicant_id);

create index if not exists announcement_chats_owner_id_idx on public.announcement_chats (owner_id);
create index if not exists announcement_chats_applicant_id_idx on public.announcement_chats (applicant_id);
create index if not exists announcement_chats_status_idx on public.announcement_chats (status);
create index if not exists announcement_chats_last_message_at_idx on public.announcement_chats (last_message_at desc nulls last);

create table if not exists public.announcement_chat_messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.announcement_chats(id) on delete cascade,
  sender_id uuid not null references public.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  constraint announcement_chat_messages_body_check check (char_length(trim(body)) > 0)
);

create index if not exists announcement_chat_messages_chat_id_created_at_idx
  on public.announcement_chat_messages (chat_id, created_at);

create index if not exists announcement_chat_messages_sender_id_idx
  on public.announcement_chat_messages (sender_id);

alter table public.announcement_chats enable row level security;
alter table public.announcement_chat_messages enable row level security;

drop policy if exists "Participants can read announcement chats" on public.announcement_chats;
create policy "Participants can read announcement chats"
  on public.announcement_chats
  for select
  using (auth.uid() = owner_id or auth.uid() = applicant_id);

drop policy if exists "Applicants can create own announcement chats" on public.announcement_chats;
create policy "Applicants can create own announcement chats"
  on public.announcement_chats
  for insert
  with check (
    auth.uid() = applicant_id
    and owner_id <> applicant_id
    and exists (
      select 1
      from public.announcements a
      where a.id = announcement_id
        and a."user" = owner_id
    )
  );

drop policy if exists "Owners can moderate announcement chats" on public.announcement_chats;
create policy "Owners can moderate announcement chats"
  on public.announcement_chats
  for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

drop policy if exists "Participants can read announcement chat messages" on public.announcement_chat_messages;
create policy "Participants can read announcement chat messages"
  on public.announcement_chat_messages
  for select
  using (
    exists (
      select 1
      from public.announcement_chats c
      where c.id = chat_id
        and (c.owner_id = auth.uid() or c.applicant_id = auth.uid())
    )
  );

drop policy if exists "Accepted participants can create announcement chat messages" on public.announcement_chat_messages;
create policy "Accepted participants can create announcement chat messages"
  on public.announcement_chat_messages
  for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1
      from public.announcement_chats c
      where c.id = chat_id
        and c.status = 'accepted'
        and (c.owner_id = auth.uid() or c.applicant_id = auth.uid())
    )
  );

create or replace function public.sync_announcement_chat_counts()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update public.announcements
    set responses_count = (
      select count(*)::int
      from public.announcement_chats
      where announcement_id = new.announcement_id
    )
    where id = new.announcement_id;

    return new;
  end if;

  if tg_op = 'DELETE' then
    update public.announcements
    set responses_count = (
      select count(*)::int
      from public.announcement_chats
      where announcement_id = old.announcement_id
    )
    where id = old.announcement_id;

    return old;
  end if;

  return null;
end;
$$;

drop trigger if exists sync_announcement_chat_counts_on_chats on public.announcement_chats;
create trigger sync_announcement_chat_counts_on_chats
  after insert or delete on public.announcement_chats
  for each row
  execute function public.sync_announcement_chat_counts();

create or replace function public.touch_announcement_chat_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_announcement_chat_updated_at_on_chats on public.announcement_chats;
create trigger touch_announcement_chat_updated_at_on_chats
  before update on public.announcement_chats
  for each row
  execute function public.touch_announcement_chat_updated_at();

create or replace function public.sync_announcement_chat_last_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.announcement_chats
  set last_message_at = new.created_at,
      last_message_sender_id = new.sender_id,
      updated_at = now()
  where id = new.chat_id;

  return new;
end;
$$;

drop trigger if exists sync_announcement_chat_last_message_on_messages on public.announcement_chat_messages;
create trigger sync_announcement_chat_last_message_on_messages
  after insert on public.announcement_chat_messages
  for each row
  execute function public.sync_announcement_chat_last_message();

create or replace function public.mark_announcement_chat_read(target_chat_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.announcement_chats
  set owner_last_read_at = case
        when owner_id = auth.uid() then now()
        else owner_last_read_at
      end,
      applicant_last_read_at = case
        when applicant_id = auth.uid() then now()
        else applicant_last_read_at
      end
  where id = target_chat_id
    and (owner_id = auth.uid() or applicant_id = auth.uid());
end;
$$;

create or replace function public.finish_announcement_chat(target_chat_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.announcement_chats
  set status = 'archived',
      updated_at = now()
  where id = target_chat_id
    and status = 'accepted'
    and (owner_id = auth.uid() or applicant_id = auth.uid());
end;
$$;
