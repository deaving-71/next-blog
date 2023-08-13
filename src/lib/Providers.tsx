"use client";

import { NotificationProvider } from "@/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = { children: React.ReactNode };

export default function Providers({ children }: Props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>{children}</NotificationProvider>
    </QueryClientProvider>
  );
}
