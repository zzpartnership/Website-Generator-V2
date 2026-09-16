-- One table for every site. Run once in the Supabase SQL editor.
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  project text not null,
  kind text not null check (kind in ('form', 'reaction', 'test')),
  payload jsonb not null default '{}'::jsonb
);
create index if not exists submissions_project_kind_idx on public.submissions (project, kind, created_at);
alter table public.submissions enable row level security;
-- The Worker uses the service key, which bypasses RLS. No anon policy is created on purpose.
