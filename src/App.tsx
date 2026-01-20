import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TradeLogin from "./pages/TradeLogin";
import TradeDashboard from "./pages/TradeDashboard";
import VrmResults from "./pages/VrmResults";
import ProductDetail from "./pages/ProductDetail";
import ProtectedTradeRoute from "./components/ProtectedTradeRoute";
import { TradeAuthProvider } from "./contexts/TradeAuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TradeAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vehicle" element={<VrmResults />} />
            <Route path="/product/:partNumber" element={<ProductDetail />} />
            <Route path="/trade/login" element={<TradeLogin />} />
            <Route
              path="/trade/dashboard"
              element={
                <ProtectedTradeRoute>
                  <TradeDashboard />
                </ProtectedTradeRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TradeAuthProvider>
  </QueryClientProvider>
);

export default App;
