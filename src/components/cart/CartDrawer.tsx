import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useTradeAuth } from "@/contexts/TradeAuthContext";
import { useNavigate } from "react-router-dom";
import CartItemRow from "./CartItemRow";

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setCartOpen,
    clearCart,
    showVat,
    setShowVat,
    subtotal,
    vatAmount,
    total,
    itemCount
  } = useCart();
  
  const { user } = useTradeAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Add some parts to get started
            </p>
            <Button onClick={() => setCartOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Cart Footer */}
            <div className="border-t border-border pt-4 space-y-4">
              {/* VAT Toggle - Only show for trade accounts or allow toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id="vat-toggle"
                    checked={showVat}
                    onCheckedChange={setShowVat}
                  />
                  <Label htmlFor="vat-toggle" className="text-sm cursor-pointer">
                    Show prices inc. VAT
                  </Label>
                </div>
                {user && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">
                    Trade Account
                  </span>
                )}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal (exc. VAT)</span>
                  <span className="font-medium">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VAT (20%)</span>
                  <span className="font-medium">£{vatAmount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total {showVat ? "(inc. VAT)" : "(exc. VAT)"}</span>
                  <span className="text-primary">£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button 
                  className="w-full btn-primary h-12 font-semibold"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-destructive"
                  onClick={clearCart}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
