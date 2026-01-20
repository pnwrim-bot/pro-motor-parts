import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useTradeAuth } from "./TradeAuthContext";

export interface CartItem {
  id: string;
  partNumber: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image?: string;
  inStock: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  showVat: boolean;
  setShowVat: (show: boolean) => void;
  subtotal: number;
  vatAmount: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VAT_RATE = 0.20; // 20% UK VAT

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("apex-cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setCartOpen] = useState(false);
  const [showVat, setShowVat] = useState(true);
  
  const { user } = useTradeAuth();

  // Trade accounts default to exc. VAT view
  useEffect(() => {
    if (user) {
      setShowVat(false);
    }
  }, [user]);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("apex-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...newItem, quantity }];
    });
    setCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vatAmount = subtotal * VAT_RATE;
  const total = showVat ? subtotal + vatAmount : subtotal;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setCartOpen,
        showVat,
        setShowVat,
        subtotal,
        vatAmount,
        total,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
