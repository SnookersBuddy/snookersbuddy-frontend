import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./providers";
import { Landing } from "./features/landing";
import { OrderRoutes } from "./features/order";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RoundOverview } from "./features/round-overview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/assignments/*",
    element: <OrderRoutes />,
  },
  {
    path: "/round-overview",
    element: <RoundOverview />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback="Laden...">
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
);