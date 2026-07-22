create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  monthly_income numeric(12,2) not null default 0 check (monthly_income >= 0),
  housing numeric(12,2) not null default 0 check (housing >= 0),
  utilities numeric(12,2) not null default 0 check (utilities >= 0),
  food numeric(12,2) not null default 0 check (food >= 0),
  transport numeric(12,2) not null default 0 check (transport >= 0),
  debt numeric(12,2) not null default 0 check (debt >= 0),
  giving numeric(12,2) not null default 0 check (giving >= 0),
  savings numeric(12,2) not null default 0 check (savings >= 0),
  other numeric(12,2) not null default 0 check (other >= 0)
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  description text not null,
  amount numeric(12,2) not null check (amount > 0),
  category text not null,
  spent_on date not null default current_date
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=''
as $$
begin
  insert into public.profiles(id,full_name)
  values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.budgets enable row level security;
alter table public.expenses enable row level security;

create policy "Users view own profile" on public.profiles
for select to authenticated using (auth.uid() = id);

create policy "Users update own profile" on public.profiles
for update to authenticated using (auth.uid() = id);

create policy "Users manage own budget" on public.budgets
for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own expenses" on public.expenses
for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
