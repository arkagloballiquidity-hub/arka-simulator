-- ═══════════════════════════════════════════════════════════════
-- ARKA GLOBAL LIQUIDITY — Investment Simulator
-- Supabase Schema  ·  Run in SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- LEADS TABLE (captura de prospectos)
create table if not exists public.leads (
  id           bigserial primary key,
  name         text not null,
  email        text not null unique,
  whatsapp     text,
  amount_range text,
  strategy     text,
  capital      numeric,
  years        integer,
  monthly      numeric,
  created_at   timestamptz default now()
);

-- Row Level Security
alter table public.leads enable row level security;

-- Allow inserts from anon (visitors can submit)
create policy "Allow anon insert" on public.leads
  for insert to anon with check (true);

-- Only service_role can read leads (your backend/admin)
create policy "Service role read" on public.leads
  for select to service_role using (true);

-- Index
create index on public.leads (created_at desc);
create index on public.leads (email);

-- ───────────────────────────────────────────────────────────────
-- HOW TO USE:
--
-- 1. Go to https://app.supabase.com → Your Project
-- 2. SQL Editor → New Query
-- 3. Paste this file → Run
-- 4. Go to Settings → API → copy:
--    - Project URL  → SUPABASE_URL in index.html
--    - anon/public key → SUPABASE_KEY in index.html
-- ───────────────────────────────────────────────────────────────
