import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, CartItem } from "@/contexts/CartContext";

interface CartItemRowProps {
  item: CartItem;
}

const CartItemRow = ({ item }: CartItemRowProps) => {
  const { updateQuantity, removeItem, showVat } = useCart();
  
  const VAT_RATE = 0.20;
  const displayPrice = showVat ? item.price * (1 + VAT_RATE) : item.price;
  const lineTotal = displayPrice * item.quantity;

  return (
    <div className="flex gap-4 p-3 rounded-lg bg-secondary/30 border border-border">
      {/* Image */}
      <div className="w-20 h-20 rounded bg-muted flex-shrink-0 overflow-hidden">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-semibold text-sm line-clamp-2 text-foreground">
              {item.name}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {item.brand} • <span className="font-mono">{item.partNumber}</span>
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 bg-background rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="w-8 text-center font-semibold text-sm">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-bold text-foreground">
              £{lineTotal.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">
              £{displayPrice.toFixed(2)} each
            </p>
          </div>
        </div>

        {/* Stock Status */}
        {!item.inStock && (
          <p className="text-xs text-amber-600 mt-2">
            Usually dispatched in 2-3 days
          </p>
        )}
      </div>
    </div>
  );
};

export default CartItemRow;
