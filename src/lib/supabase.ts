import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('Supabase config:', {
  url: supabaseUrl,
  hasAnonKey: !!supabaseAnonKey,
  anonKeyLength: supabaseAnonKey?.length
});

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Test connection and table existence
supabase.from('contact_messages').select('count', { count: 'exact', head: true })
  .then(({ error, count }) => {
    if (error) {
      console.error('❌ Database connection test failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      console.error('🔥 Please run the SQL from database-setup.sql in your Supabase dashboard');
    } else {
      console.log('✅ Supabase connection test successful');
      console.log(`📊 Found ${count || 0} messages in database`);
    }
  });

// Server client for admin operations
export const createServerClient = () => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}