alter table public.announcement_chats
  drop constraint if exists announcement_chats_status_check;

alter table public.announcement_chats
  add constraint announcement_chats_status_check
  check (status in ('pending', 'accepted', 'rejected', 'archived'));

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
