-- CREATE ADMIN USER FOR TESTING
-- Run this in Supabase SQL Editor to create a test admin account

-- Note: You still need to create the actual user account through Supabase Auth
-- This is just for reference. Do ONE of these steps:

-- OPTION 1: Create user through Supabase Dashboard
-- 1. Go to Authentication > Users in your Supabase dashboard
-- 2. Click "Add User" 
-- 3. Enter email: admin@test.com
-- 4. Enter password: admin123456
-- 5. Click "Create User"

-- OPTION 2: Create user through SQL (Advanced)
-- This requires service role key, so use Dashboard method instead

-- OPTION 3: Sign up through your app (if you have signup enabled)
-- You can temporarily enable signup by going to Authentication > Settings
-- and enabling "Enable email confirmations" = OFF for testing

-- TEST CREDENTIALS FOR LOGIN:
-- Email: admin@test.com  
-- Password: admin123456

-- After creating user, test login at: http://localhost:3000/admin/login