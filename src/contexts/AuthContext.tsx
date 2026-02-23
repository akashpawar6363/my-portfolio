'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any; data: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signIn: async () => ({ error: null, data: null }),
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔄 AuthContext: Initializing auth state');
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('🚨 AuthContext: Error getting initial session:', error);
      } else {
        console.log('🔄 AuthContext: Initial session:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email
        });
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 AuthContext: Auth state change:', {
        event,
        hasSession: !!session,
        hasUser: !!session?.user,
        userEmail: session?.user?.email
      });
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log('🔄 AuthContext: Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 AuthContext: Attempting signIn for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('🔐 AuthContext: Supabase response:', { 
        hasData: !!data, 
        hasUser: !!data?.user,
        hasSession: !!data?.session,
        error 
      });
      
      if (error) {
        console.error('🚨 AuthContext: Sign in error:', error);
        return { error, data: null };
      }
      
      console.log('✅ AuthContext: Sign in successful');
      return { error: null, data };
    } catch (err) {
      console.error('🚨 AuthContext: Sign in exception:', err);
      return { error: { message: 'An unexpected error occurred' }, data: null };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
    } catch (err) {
      console.error('Sign out exception:', err);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};