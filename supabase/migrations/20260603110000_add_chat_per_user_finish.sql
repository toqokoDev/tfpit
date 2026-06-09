alter table public.announcement_chats
  add column if not exists owner_finished_at timestamptz,
  add column if not exists applicant_finished_at timestamptz;

create or replace function public.finish_announcement_chat(target_chat_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  chat public.announcement_chats%rowtype;
  new_owner_finished_at timestamptz;
  new_applicant_finished_at timestamptz;
begin
  select *
  into chat
  from public.announcement_chats
  where id = target_chat_id
    and status = 'accepted'
    and (owner_id = auth.uid() or applicant_id = auth.uid());

  if not found then
    return;
  end if;

  new_owner_finished_at := coalesce(
    chat.owner_finished_at,
    case when chat.owner_id = auth.uid() then now() end
  );
  new_applicant_finished_at := coalesce(
    chat.applicant_finished_at,
    case when chat.applicant_id = auth.uid() then now() end
  );

  update public.announcement_chats
  set owner_finished_at = new_owner_finished_at,
      applicant_finished_at = new_applicant_finished_at,
      status = case
        when new_owner_finished_at is not null and new_applicant_finished_at is not null
        then 'archived'
        else status
      end,
      updated_at = now()
  where id = target_chat_id;
end;
$$;

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
        and c.owner_finished_at is null
        and c.applicant_finished_at is null
        and (c.owner_id = auth.uid() or c.applicant_id = auth.uid())
    )
  );
