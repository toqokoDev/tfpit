create extension if not exists pgcrypto;

create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  portfolio_id uuid references public.portfolios(id) on delete cascade,
  announcement_id uuid references public.announcements(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint likes_single_target_check check (
    (portfolio_id is not null and announcement_id is null)
    or (portfolio_id is null and announcement_id is not null)
  )
);

create unique index if not exists likes_user_portfolio_unique
  on public.likes (user_id, portfolio_id)
  where portfolio_id is not null;

create unique index if not exists likes_user_announcement_unique
  on public.likes (user_id, announcement_id)
  where announcement_id is not null;

create index if not exists likes_portfolio_id_idx on public.likes (portfolio_id);
create index if not exists likes_announcement_id_idx on public.likes (announcement_id);
create index if not exists likes_user_id_idx on public.likes (user_id);

alter table public.likes enable row level security;

drop policy if exists "Anyone can read likes" on public.likes;
create policy "Anyone can read likes"
  on public.likes
  for select
  using (true);

drop policy if exists "Users can create own likes" on public.likes;
create policy "Users can create own likes"
  on public.likes
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own likes" on public.likes;
create policy "Users can delete own likes"
  on public.likes
  for delete
  using (auth.uid() = user_id);

create or replace function public.sync_like_counts()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    if new.portfolio_id is not null then
      update public.portfolios
      set likes_count = (
        select count(*)::int
        from public.likes
        where portfolio_id = new.portfolio_id
      )
      where id = new.portfolio_id;
    end if;

    if new.announcement_id is not null then
      update public.announcements
      set likes_count = (
        select count(*)::int
        from public.likes
        where announcement_id = new.announcement_id
      )
      where id = new.announcement_id;
    end if;

    return new;
  end if;

  if old.portfolio_id is not null then
    update public.portfolios
    set likes_count = (
      select count(*)::int
      from public.likes
      where portfolio_id = old.portfolio_id
    )
    where id = old.portfolio_id;
  end if;

  if old.announcement_id is not null then
    update public.announcements
    set likes_count = (
      select count(*)::int
      from public.likes
      where announcement_id = old.announcement_id
    )
    where id = old.announcement_id;
  end if;

  return old;
end;
$$;

drop trigger if exists sync_like_counts_on_likes on public.likes;
create trigger sync_like_counts_on_likes
  after insert or delete on public.likes
  for each row
  execute function public.sync_like_counts();
