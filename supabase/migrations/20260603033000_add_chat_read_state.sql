alter table public.announcement_chats
  add column if not exists last_message_sender_id uuid references public.users(id) on delete set null,
  add column if not exists owner_last_read_at timestamptz,
  add column if not exists applicant_last_read_at timestamptz;

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
