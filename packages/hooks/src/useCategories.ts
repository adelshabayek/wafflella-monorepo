"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subscribeToCategories } from "@wafflella/firebase";
import type { Category } from "@wafflella/types";

export function useCategories() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToCategories((categories) => {
      queryClient.setQueryData<Category[]>(["categories"], categories);
    });
    return unsubscribe;
  }, [queryClient]);

  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => queryClient.getQueryData<Category[]>(["categories"]) ?? [],
    staleTime: Infinity,
  });
}
