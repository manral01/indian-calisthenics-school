-- Online course (LMS) database for indiancalisthenicsschool.com
-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Safe to re-run.

-- Payments. Written only by the server (service role); students can read their own.
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product text not null check (product in ('stage-1', 'stage-2', 'stage-3', 'bundle')),
  amount_paise integer not null check (amount_paise > 0),
  currency text not null default 'INR',
  status text not null default 'created' check (status in ('created', 'paid', 'failed')),
  razorpay_order_id text not null unique,
  razorpay_payment_id text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index if not exists orders_user_idx on public.orders (user_id);

-- Which stages a student has unlocked. Written only by the server
-- (or by Aman in the dashboard to gift access).
create table if not exists public.enrollments (
  user_id uuid not null references auth.users (id) on delete cascade,
  stage text not null check (stage in ('stage-1', 'stage-2', 'stage-3')),
  order_id uuid references public.orders (id) on delete set null,
  note text,
  created_at timestamptz not null default now(),
  primary key (user_id, stage)
);

-- Lessons a student has marked complete. Students manage their own rows.
create table if not exists public.lesson_progress (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_id text not null check (char_length(lesson_id) <= 40),
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.orders enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;

drop policy if exists "own orders" on public.orders;
create policy "own orders" on public.orders
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "own enrollments" on public.enrollments;
create policy "own enrollments" on public.enrollments
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "own progress read" on public.lesson_progress;
create policy "own progress read" on public.lesson_progress
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "own progress add" on public.lesson_progress;
create policy "own progress add" on public.lesson_progress
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "own progress remove" on public.lesson_progress;
create policy "own progress remove" on public.lesson_progress
  for delete to authenticated using (user_id = auth.uid());

-- Handy view for Aman: who bought what (visible only in the dashboard / service role).
create or replace view public.course_sales
with (security_invoker = true) as
select o.created_at, o.paid_at, u.email, o.product, o.amount_paise / 100.0 as amount_inr,
       o.status, o.razorpay_payment_id
from public.orders o
join auth.users u on u.id = o.user_id
order by o.created_at desc;
revoke all on public.course_sales from anon, authenticated;
