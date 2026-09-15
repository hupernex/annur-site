-- Feedback submissions from the annur-site public website.
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  category text not null check (category in ('bug', 'feature', 'general')),
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

-- Anonymous visitors may submit feedback, but cannot read, update, or
-- delete any row (including their own) -- only project staff querying
-- with the service role key can read this table.
create policy "Anyone can submit feedback"
  on public.feedback
  for insert
  to anon
  with check (true);
