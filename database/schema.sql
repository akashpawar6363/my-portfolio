-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE,
  admin_notes TEXT DEFAULT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);

-- Enable RLS (Row Level Security)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy for inserting contact messages (anyone can insert)
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Policy for reading contact messages (only authenticated users)
CREATE POLICY "Only authenticated users can read messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for updating contact messages (only authenticated users)
CREATE POLICY "Only authenticated users can update messages" ON contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a function to get message stats
CREATE OR REPLACE FUNCTION get_message_stats()
RETURNS TABLE(total_messages BIGINT, unread_messages BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_messages,
    COUNT(CASE WHEN is_read = false THEN 1 END)::BIGINT as unread_messages
  FROM contact_messages;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;