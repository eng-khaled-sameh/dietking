"use client";
import { useQuery } from '@tanstack/react-query';
import { supabase, api } from '../lib/api';

export function useBranches() {
  return useQuery({
    queryKey: ['branches'],
    queryFn: async () => {
      const data = await api.query(
        supabase.from("branches")
          .select("id, name, phone, code, version, created_at")
          .is("deleted_at", null)
          .order("created_at")
      );
      return data || [];
    }
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const data = await api.query(
        supabase.from("categories")
          .select("*")
          .is("deleted_at", null)
      );
      return data || [];
    }
  });
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const data = await api.query(
        supabase.from("products")
          .select("*")
          .is("deleted_at", null)
      );
      return data || [];
    }
  });
}

export function useProductVariants() {
  return useQuery({
    queryKey: ['product_variants'],
    queryFn: async () => {
      const data = await api.query(
        supabase.from("product_variants")
          .select("*")
          .is("deleted_at", null)
      );
      return data || [];
    }
  });
}
