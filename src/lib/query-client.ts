import { QueryClient } from "@tanstack/react-query";

/**
 * The default query client of this app.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: Infinity,
    },
  },
});
