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
  email text check (email is null or char_length(email) between 3 and 254),
  instagram text check (instagram is null or char_length(instagram) between 1 and 60),
  note text not null default '' check (char_length(note) <= 1000),
  purpose text not null check (purpose in ('volunteer', 'mentor', 'sponsor', 'care', 'general')),
  phone text check (phone is null or char_length(phone) <= 40),
  western_student boolean,
  interests text[] not null default '{}'::text[],
  added_by_admin boolean not null default false,
  constraint involve_signups_contact_check check (email is not null or instagram is not null)
);

create unique index if not exists involve_signups_email_lower_idx
  on public.involve_signups (lower(email));

create unique index if not exists involve_signups_instagram_lower_idx
  on public.involve_signups (lower(instagram));

-- Migration for an existing table created before instagram/admin support:
-- alter table public.involve_signups add column if not exists instagram text;
-- alter table public.involve_signups add column if not exists added_by_admin boolean not null default false;
-- alter table public.involve_signups alter column email drop not null;
-- alter table public.involve_signups drop constraint if exists involve_signups_email_check;
-- alter table public.involve_signups add constraint involve_signups_email_check check (email is null or char_length(email) between 3 and 254);
-- alter table public.involve_signups add constraint involve_signups_instagram_check check (instagram is null or char_length(instagram) between 1 and 60);
-- alter table public.involve_signups add constraint involve_signups_contact_check check (email is not null or instagram is not null);
-- create unique index if not exists involve_signups_instagram_lower_idx on public.involve_signups (lower(instagram));

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

grant update, delete on table public.involve_signups to anon, authenticated;

drop policy if exists "server can update involve signups" on public.involve_signups;
create policy "server can update involve signups"
  on public.involve_signups
  for update
  to anon, authenticated
  using (private.involve_server_ok())
  with check (private.involve_server_ok());

drop policy if exists "server can delete involve signups" on public.involve_signups;
create policy "server can delete involve signups"
  on public.involve_signups
  for delete
  to anon, authenticated
  using (private.involve_server_ok());

-- ── Events + attendance ──────────────────────────────────────────────

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null check (char_length(title) between 1 and 120),
  event_date date,
  description text not null default '' check (char_length(description) <= 1000)
);

alter table public.events enable row level security;
revoke all on table public.events from public, anon, authenticated;
grant all on table public.events to service_role;
grant select, insert, update, delete on table public.events to anon, authenticated;

drop policy if exists "server can manage events" on public.events;
create policy "server can manage events"
  on public.events
  for all
  to anon, authenticated
  using (private.involve_server_ok())
  with check (private.involve_server_ok());

create table if not exists public.event_attendance (
  event_id uuid not null references public.events(id) on delete cascade,
  signup_id uuid not null references public.involve_signups(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (event_id, signup_id)
);

create index if not exists event_attendance_signup_idx
  on public.event_attendance (signup_id);

alter table public.event_attendance enable row level security;
revoke all on table public.event_attendance from public, anon, authenticated;
grant all on table public.event_attendance to service_role;
grant select, insert, delete on table public.event_attendance to anon, authenticated;

drop policy if exists "server can manage attendance" on public.event_attendance;
create policy "server can manage attendance"
  on public.event_attendance
  for all
  to anon, authenticated
  using (private.involve_server_ok())
  with check (private.involve_server_ok());

-- ── Polls ─────────────────────────────────────────────────────────────

create table if not exists public.polls (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  question text not null check (char_length(question) between 1 and 300),
  options text[] not null check (array_length(options, 1) between 2 and 10),
  closed boolean not null default false
);

alter table public.polls enable row level security;
revoke all on table public.polls from public, anon, authenticated;
grant all on table public.polls to service_role;
grant select, insert, update, delete on table public.polls to anon, authenticated;

drop policy if exists "server can manage polls" on public.polls;
create policy "server can manage polls"
  on public.polls
  for all
  to anon, authenticated
  using (private.involve_server_ok())
  with check (private.involve_server_ok());

create table if not exists public.poll_responses (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id) on delete cascade,
  created_at timestamptz not null default now(),
  option_index int not null check (option_index >= 0),
  respondent_name text check (respondent_name is null or char_length(respondent_name) <= 80),
  respondent_email text check (respondent_email is null or char_length(respondent_email) <= 254)
);

create index if not exists poll_responses_poll_idx
  on public.poll_responses (poll_id);

alter table public.poll_responses enable row level security;
revoke all on table public.poll_responses from public, anon, authenticated;
grant all on table public.poll_responses to service_role;
grant select, insert, delete on table public.poll_responses to anon, authenticated;

drop policy if exists "server can manage poll responses" on public.poll_responses;
create policy "server can manage poll responses"
  on public.poll_responses
  for all
  to anon, authenticated
  using (private.involve_server_ok())
  with check (private.involve_server_ok());
