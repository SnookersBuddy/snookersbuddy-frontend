import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React, { Suspense, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./providers";
import { Landing } from "./features/landing";
import { OrderRoutes } from "./features/order";
import { QueryClientProvider } from "@tanstack/react-query";
import { RoundOverview } from "./features/round-overview";
import { queryClient } from "./lib";
import AdminRoutes from "./features/admin/routes/routes";
import DefaultErrorPage from "./components/default-error-page";
import { useIntrospectionStore } from "./state/introspection";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { invariant } from "./utils/invariant";

function Root() {
  const { registeredFunctions, setFunctionToFail } = useIntrospectionStore();

  const functionSymbolIndex = useMemo(() => {
    return registeredFunctions.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.description!]: curr,
      }),
      {} as Record<string, Symbol>
    );
  }, [registeredFunctions]);

  const handleOperationChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const symbol = functionSymbolIndex[value];
    invariant(symbol, "function symbol not in index");
    setFunctionToFail(symbol);
  };

  return (
    <>
      <Box position="fixed" right={0} bottom={0}>
        <FormControl>
          <InputLabel id="debug-operation">Operation</InputLabel>
          <Select
            onChange={handleOperationChange}
            defaultValue=""
            labelId="debug-operation"
            label="Operation"
            autoWidth
          >
            {registeredFunctions.map((func) => (
              <MenuItem key={func.description} value={func.description}>
                {func.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Outlet />
    </>
  );
}

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
