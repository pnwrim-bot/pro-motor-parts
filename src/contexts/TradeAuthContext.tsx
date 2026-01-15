import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface TradeUser {
  id: string;
  companyName: string;
  email: string;
  accountNumber: string;
  discountTier: "bronze" | "silver" | "gold" | "platinum";
  creditLimit: number;
}

interface TradeAuthContextType {
  user: TradeUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const TradeAuthContext = createContext<TradeAuthContextType | undefined>(undefined);

// Mock trade users for demo
const MOCK_TRADE_USERS: Record<string, TradeUser & { password: string }> = {
  "trade@apexmotors.co.uk": {
    id: "TRD-001",
    companyName: "Smith's Auto Repairs Ltd",
    email: "trade@apexmotors.co.uk",
    password: "trade123",
    accountNumber: "APX-78432",
    discountTier: "gold",
    creditLimit: 15000,
  },
  "demo@garage.com": {
    id: "TRD-002",
    companyName: "Demo Garage Services",
    email: "demo@garage.com",
    password: "demo123",
    accountNumber: "APX-99001",
    discountTier: "silver",
    creditLimit: 7500,
  },
};

export const TradeAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TradeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("tradeUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockUser = MOCK_TRADE_USERS[email.toLowerCase()];
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem("tradeUser", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tradeUser");
  };

  return (
    <TradeAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </TradeAuthContext.Provider>
  );
};

export const useTradeAuth = () => {
  const context = useContext(TradeAuthContext);
  if (context === undefined) {
    throw new Error("useTradeAuth must be used within a TradeAuthProvider");
  }
  return context;
};
