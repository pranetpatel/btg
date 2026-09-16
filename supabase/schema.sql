-- Involve signups for the Be The Good website.
-- Applied remotely via Supabase MCP; kept here so the app and DB stay in sync.

create schema if not exists private;

revoke all on schema private from public;
grant usage on schema private to postgres, service_role, anon, authenticated;

create table if not exists private.involve_settings (
  id int primary key default 1 check (id = 1),
  server_secret text not null
);

revoke all on table private.involve_settings from public, anon, authenticated;

create table if not exists public.involve_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 80),
  email text not null check (char_length(email) between 3 and 254),
  note text not null default '' check (char_length(note) <= 1000),
  purpose text not null check (purpose in ('volunteer', 'mentor', 'sponsor', 'care', 'general')),
  phone text check (phone is null or char_length(phone) <= 40),
  western_student boolean,
  interests text[] not null default '{}'::text[]
);

create unique index if not exists involve_signups_email_lower_idx
  on public.involve_signups (lower(email));

create or replace function private.involve_server_ok()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    length(coalesce((select s.server_secret from private.involve_settings s where s.id = 1), '')) > 0
    and coalesce(current_setting('request.headers', true)::json->>'x-btg-signup-secret', '')
      = coalesce((select s.server_secret from private.involve_settings s where s.id = 1), '');
$$;

revoke all on function private.involve_server_ok() from public;
grant execute on function private.involve_server_ok() to anon, authenticated, service_role;

alter table public.involve_signups enable row level security;

revoke all on table public.involve_signups from public;
revoke all on table public.involve_signups from anon, authenticated;
grant insert, select on table public.involve_signups to anon, authenticated;
grant all on table public.involve_signups to service_role;

drop policy if exists "server can insert involve signups" on public.involve_signups;
create policy "server can insert involve signups"
  on public.involve_signups
  for insert
  to anon, authenticated
  with check (private.involve_server_ok());

drop policy if exists "server can read involve signups" on public.involve_signups;
create policy "server can read involve signups"
  on public.involve_signups
  for select
  to anon, authenticated
  using (private.involve_server_ok());
