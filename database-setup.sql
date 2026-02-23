-- Create the contact_messages table in your Supabase database
-- Run this SQL in your Supabase SQL Editor

-- First, drop the table if it exists to ensure clean setup
DROP TABLE IF EXISTS contact_messages;

CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT 'Contact Form Message',
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create an index on created_at for better performance
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Create an index on is_read for filtering
CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public to insert messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to view messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to update messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to delete messages" ON contact_messages;

-- CRITICAL: Allow ANYONE (including anonymous users) to insert new messages
-- This is essential for the contact form to work
CREATE POLICY "Enable insert for anonymous users" ON contact_messages
    FOR INSERT TO anon
    WITH CHECK (true);

-- Also allow authenticated users to insert
CREATE POLICY "Enable insert for authenticated users" ON contact_messages
    FOR INSERT TO authenticated  
    WITH CHECK (true);

-- Allow authenticated users to view all messages (admin access)
CREATE POLICY "Enable read for authenticated users" ON contact_messages
    FOR SELECT TO authenticated
    USING (true);

-- Allow authenticated users to update messages (admin actions)
CREATE POLICY "Enable update for authenticated users" ON contact_messages
    FOR UPDATE TO authenticated
    USING (true);

-- Allow authenticated users to delete messages (admin actions)
CREATE POLICY "Enable delete for authenticated users" ON contact_messages
    FOR DELETE TO authenticated
    USING (true);

-- Grant necessary permissions explicitly
GRANT ALL ON contact_messages TO anon;
GRANT ALL ON contact_messages TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Test insert to verify setup works for anonymous users
INSERT INTO contact_messages (name, email, subject, message) 
VALUES ('Test User', 'test@example.com', 'Test Subject', 'This is a test message to verify anonymous insert works correctly.');

-- Select to verify the test insert worked
SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 1;