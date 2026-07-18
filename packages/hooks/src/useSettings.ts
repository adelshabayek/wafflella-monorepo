"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subscribeToSettings } from "@wafflella/firebase";
import type { ShopSettings } from "@wafflella/types";

export function useSettings() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Subscribe to Firestore realtime updates
    const unsubscribe = subscribeToSettings((settings) => {
      queryClient.setQueryData<ShopSettings | null>(["settings"], settings);
    });
    return unsubscribe;
  }, [queryClient]);

  return useQuery<ShopSettings | null>({
    queryKey: ["settings"],
    queryFn: () => queryClient.getQueryData<ShopSettings | null>(["settings"]) ?? null,
    staleTime: Infinity, // Firestore listener keeps cache fresh
  });
}
