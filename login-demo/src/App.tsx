import { Toaster } from "@/components/organisms/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * The main application component that sets up the global providers and routing.
 *
 * - Wraps the app with `QueryClientProvider` for React Query state management.
 * - Displays global notifications using the `Toaster` component.
 * - Uses `BrowserRouter` to enable client-side routing.
 * - Defines routes for:
 *   - `/` to render the `Login` component.
 *   - `/dashboard` to render the `Dashboard` component.
 *   - Any other path (`*`) to render the `NotFound` component.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
