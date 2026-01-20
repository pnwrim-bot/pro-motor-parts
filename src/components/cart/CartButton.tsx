import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const CartButton = () => {
  const { setCartOpen, itemCount } = useCart();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => setCartOpen(true)}
      aria-label="Open cart"
    >
      <ShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Button>
  );
};

export default CartButton;
