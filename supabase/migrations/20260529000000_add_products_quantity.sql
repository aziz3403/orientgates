-- Add quantity column to products.
-- Defaults to 1 (one-of-a-kind). 0 means sold out.
-- Required by admin UI, bulk import, and supabase-format helpers
-- which already read/write product.quantity.

alter table public.products
  add column if not exists quantity integer not null default 1
  check (quantity >= 0);

comment on column public.products.quantity is
  'Units in stock. Defaults to 1 (one-of-a-kind). 0 = sold out.';
