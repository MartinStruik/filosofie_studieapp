-- =============================================================
-- Filosofie Studieapp — Supabase Database Schema
-- =============================================================
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor)
-- =============================================================

-- 1. Profielen (gekoppeld aan Supabase Auth)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text not null,
  role text not null default 'student' check (role in ('student', 'docent')),
  created_at timestamptz default now()
);

-- 2. Voortgang (één JSONB-blob per leerling)
create table public.progress (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- =============================================================
-- Row Level Security
-- =============================================================

alter table public.profiles enable row level security;
alter table public.progress enable row level security;

-- Profiles: iedereen kan eigen profiel lezen, docent kan alles lezen
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Docent can read all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'docent'
    )
  );

-- Progress: leerling leest/schrijft eigen data, docent leest alles
create policy "Users can read own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.progress for update
  using (auth.uid() = user_id);

create policy "Docent can read all progress"
  on public.progress for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'docent'
    )
  );

-- =============================================================
-- Trigger: automatisch profiel aanmaken bij nieuwe auth.user
-- =============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );

  insert into public.progress (user_id, data)
  values (new.id, '{}'::jsonb);

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================
-- Handmatig docentaccount aanmaken (na registratie via Auth):
-- UPDATE public.profiles SET role = 'docent' WHERE display_name = 'M. Struik';
-- =============================================================
