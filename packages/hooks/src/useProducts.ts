"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subscribeToProducts, subscribeToFeaturedProducts } from "@wafflella/firebase";
import type { Product } from "@wafflella/types";

export function useProducts(categoryId?: string) {
  const queryClient = useQueryClient();
  const queryKey = categoryId ? ["products", categoryId] : ["products"];

  useEffect(() => {
    const unsubscribe = subscribeToProducts((products) => {
      queryClient.setQueryData<Product[]>(queryKey, products);
    }, categoryId);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient, categoryId]);

  return useQuery<Product[]>({
    queryKey,
    queryFn: () => queryClient.getQueryData<Product[]>(queryKey) ?? [],
    staleTime: Infinity,
  });
}

export function useFeaturedProducts() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToFeaturedProducts((products) => {
      queryClient.setQueryData<Product[]>(["products", "featured"], products);
    });
    return unsubscribe;
  }, [queryClient]);

  return useQuery<Product[]>({
    queryKey: ["products", "featured"],
    queryFn: () =>
      queryClient.getQueryData<Product[]>(["products", "featured"]) ?? [],
    staleTime: Infinity,
  });
}
