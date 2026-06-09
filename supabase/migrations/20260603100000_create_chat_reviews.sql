create table if not exists public.announcement_chat_reviews (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.announcement_chats(id) on delete cascade,
  reviewer_id uuid not null references public.users(id) on delete cascade,
  reviewed_user_id uuid not null references public.users(id) on delete cascade,
  rating smallint not null,
  comment text not null default '',
  created_at timestamptz not null default now(),
  constraint announcement_chat_reviews_rating_check check (rating between 1 and 5),
  constraint announcement_chat_reviews_distinct_users_check check (reviewer_id <> reviewed_user_id)
);

create unique index if not exists announcement_chat_reviews_chat_reviewer_unique
  on public.announcement_chat_reviews (chat_id, reviewer_id);

create index if not exists announcement_chat_reviews_reviewed_user_id_idx
  on public.announcement_chat_reviews (reviewed_user_id, created_at desc);

alter table public.announcement_chat_reviews enable row level security;

drop policy if exists "Anyone can read chat reviews" on public.announcement_chat_reviews;
create policy "Anyone can read chat reviews"
  on public.announcement_chat_reviews
  for select
  using (true);

drop policy if exists "Participants can create chat reviews when finishing" on public.announcement_chat_reviews;
create policy "Participants can create chat reviews when finishing"
  on public.announcement_chat_reviews
  for insert
  with check (
    auth.uid() = reviewer_id
    and exists (
      select 1
      from public.announcement_chats c
      where c.id = chat_id
        and c.status = 'accepted'
        and (
          (c.owner_id = auth.uid() and c.applicant_id = reviewed_user_id)
          or (c.applicant_id = auth.uid() and c.owner_id = reviewed_user_id)
        )
    )
  );

create or replace function public.sync_user_rating_from_reviews()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_user_id uuid;
begin
  target_user_id := coalesce(new.reviewed_user_id, old.reviewed_user_id);

  update public.users
  set rating = coalesce((
    select round(avg(r.rating)::numeric, 1)
    from public.announcement_chat_reviews r
    where r.reviewed_user_id = target_user_id
  ), 5)
  where id = target_user_id;

  return coalesce(new, old);
end;
$$;

drop trigger if exists sync_user_rating_from_reviews_on_insert on public.announcement_chat_reviews;
create trigger sync_user_rating_from_reviews_on_insert
  after insert on public.announcement_chat_reviews
  for each row
  execute function public.sync_user_rating_from_reviews();
