import { supabase } from './supabase'
import { Database } from '@/types/database.types'

type ContactMessage = Database['public']['Tables']['contact_messages']['Row']
type ContactMessageInsert = Database['public']['Tables']['contact_messages']['Insert']
type ContactMessageUpdate = Database['public']['Tables']['contact_messages']['Update']

// Insert new contact message
export const insertContactMessage = async (message: { name: string; email: string; subject: string; message: string }) => {
  try {
    // Validate input data
    if (!message.name || !message.email || !message.message) {
      throw new Error('Missing required fields: name, email, and message are required');
    }

    console.log('Attempting to insert message:', { 
      name: message.name, 
      email: message.email, 
      subject: message.subject,
      messageLength: message.message.length 
    });

    const insertData = {
      name: message.name,
      email: message.email,
      subject: message.subject || 'Contact Form Message',
      message: message.message,
      is_read: false
    };

    console.log('Insert data:', insertData);

    const { data, error } = await supabase
      .from('contact_messages')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });

      // Specific handling for RLS errors
      if (error.message.includes('row-level security')) {
        console.error('🚨 RLS POLICY ERROR: The database table exists but Row Level Security policies are blocking the insert.');
        console.error('💡 SOLUTION: Run the SQL from database-setup.sql in your Supabase dashboard, or use quick-fix.sql to disable RLS temporarily.');
      }

      throw error;
    }

    console.log('Successfully inserted message:', data);
    return data;
  } catch (error) {
    console.error('Full error object:', error);
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Extract meaningful error message
    let errorMessage = 'Unknown error';
    if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = error.message || 'Database operation failed';
    }
    
    throw new Error(`Failed to save contact message: ${errorMessage}`);
  }
}

// Get all contact messages (admin only)
export const getContactMessages = async (limit?: number) => {
  let query = supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching contact messages:', error)
    throw new Error('Failed to fetch contact messages')
  }

  return data || []
}

// Get message statistics
export const getMessageStats = async () => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // Get total messages count
    const { count: totalCount } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true });

    // Get unread messages count
    const { count: unreadCount } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);

    // Get today's messages count
    const { count: todayCount } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfDay.toISOString());

    // Get this week's messages count
    const { count: weekCount } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfWeek.toISOString());

    return {
      total: totalCount || 0,
      unread: unreadCount || 0,
      today: todayCount || 0,
      thisWeek: weekCount || 0
    };
  } catch (error) {
    console.error('Error getting message stats:', error)
    return { total: 0, unread: 0, today: 0, thisWeek: 0 }
  }
}

// Mark message as read/unread
export const updateMessageReadStatus = async (id: string, is_read: boolean) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ is_read })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating message read status:', error)
    throw new Error('Failed to update message status')
  }

  return data
}

// Add admin notes to a message
export const updateMessageNotes = async (id: string, admin_notes: string) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ admin_notes })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating message notes:', error)
    throw new Error('Failed to update message notes')
  }

  return data
}

// Delete a contact message
export const deleteContactMessage = async (id: string) => {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting contact message:', error)
      throw error
    }

    return true
  } catch (error) {
    console.error('Error in deleteContactMessage:', error)
    throw new Error('Failed to delete contact message')
  }
}

// Get recent messages (for dashboard overview)
export const getRecentMessages = async (limit = 5) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('id, name, subject, created_at, is_read')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent messages:', error)
    return []
  }

  return data || []
}