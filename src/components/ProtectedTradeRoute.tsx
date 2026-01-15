import { Navigate } from "react-router-dom";
import { useTradeAuth } from "@/contexts/TradeAuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedTradeRouteProps {
  children: React.ReactNode;
}

const ProtectedTradeRoute = ({ children }: ProtectedTradeRouteProps) => {
  const { isAuthenticated, isLoading } = useTradeAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/trade/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedTradeRoute;
