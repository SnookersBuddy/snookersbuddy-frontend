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
import { QueryClientProvider } from "@tanstack/react-query";
import { RoundOverview } from "./features/round-overview";
import { queryClient } from "./lib";
import AdminRoutes from "./features/admin/routes/routes";
import DefaultErrorPage from "./components/default-error-page";
import Root from "./root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <DefaultErrorPage />,
    children: [
      {
        index: true,
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
      {
        path: "/admin/*",
        element: <AdminRoutes />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="Laden...">
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </ThemeProvider>
);
