-- TEMPORARY FIX: Disable RLS for immediate testing
-- Run this in Supabase SQL Editor if you need contact form working immediately
-- (You can re-enable RLS later with proper policies)

ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- Or if table doesn't exist yet, create it without RLS:
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT 'Contact Form Message',
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Test insert
INSERT INTO contact_messages (name, email, subject, message) 
VALUES ('Quick Test', 'quicktest@example.com', 'Test', 'Testing without RLS');

SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 1;