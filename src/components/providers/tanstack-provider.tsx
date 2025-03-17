"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";
import { PageTransition } from "../common/page-transition";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<PageTransition />}>{children}</Suspense>
    </QueryClientProvider>
  );
};

export default QueryProvider;
