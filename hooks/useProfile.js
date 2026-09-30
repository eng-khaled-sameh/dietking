"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useProfile() {
  const queryClient = useQueryClient();
  const [sessionUser, setSessionUser] = useState(undefined);

  useEffect(() => {
    let mounted = true;
    
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setSessionUser(data.user || null);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const newUser = session?.user || null;
      if (mounted) {
        setSessionUser(newUser);
      }
      if (event === 'SIGNED_OUT' || (event === 'USER_UPDATED' && !newUser)) {
        queryClient.clear();
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('REACT_QUERY_OFFLINE_CACHE');
        }
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [queryClient]);

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', sessionUser?.id],
    queryFn: async () => {
      if (!sessionUser) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionUser.id)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      return data || null;
    },
    enabled: sessionUser !== undefined,
  });

  const loading = sessionUser === undefined || isLoading;
  const isOwner = profile?.role === 'owner';

  return { profile, isOwner, loading, error };
}
