-- =============================================
-- Run this in Supabase > SQL Editor
-- Adds avatar_url column and creates storage bucket
-- =============================================

-- 1. Add avatar_url to profile table
alter table profile add column if not exists avatar_url text default null;

-- 2. Create the avatars storage bucket (public)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- 3. Allow public read on avatars bucket
create policy "public read avatars"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- 4. Allow service role to upload/delete avatars
create policy "service upload avatars"
  on storage.objects for insert
  with check (bucket_id = 'avatars');

create policy "service delete avatars"
  on storage.objects for delete
  using (bucket_id = 'avatars');
