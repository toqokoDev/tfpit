do $$
begin
  alter publication supabase_realtime add table public.announcement_chats;
  alter publication supabase_realtime add table public.announcement_chat_messages;
exception
  when duplicate_object then null;
end;
$$;
