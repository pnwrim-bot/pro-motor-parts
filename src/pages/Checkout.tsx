import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useTradeAuth } from "@/contexts/TradeAuthContext";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, subtotal, vatAmount, total, showVat, setShowVat, clearCart } = useCart();
  const { user } = useTradeAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const deliveryOptions = [
    { id: "standard", name: "Standard Delivery", price: 0, time: "2-3 working days" },
    { id: "express", name: "Express Delivery", price: 5.99, time: "Next working day" },
    { id: "collection", name: "Trade Counter Collection", price: 0, time: "Ready in 2 hours" }
  ];

  const selectedDelivery = deliveryOptions.find(d => d.id === deliveryMethod)!;
  const deliveryCost = selectedDelivery.price;
  const orderTotal = total + (showVat ? deliveryCost * 1.2 : deliveryCost);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
    
    toast({
      title: "Order Placed Successfully!",
      description: "You will receive a confirmation email shortly.",
    });
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some parts before checking out.</p>
            <Link to="/">
              <Button className="btn-primary">Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-2">
                Thank you for your order. Your order number is:
              </p>
              <p className="font-mono text-xl font-bold text-primary mb-6">
                APX-{Date.now().toString(36).toUpperCase()}
              </p>
              <p className="text-muted-foreground mb-8">
                We've sent a confirmation email with your order details and tracking information.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/">
                  <Button className="btn-primary">Continue Shopping</Button>
                </Link>
                {user && (
                  <Link to="/trade/dashboard">
                    <Button variant="outline">View Orders</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="bg-secondary/50 border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmitOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Details */}
                <div className="card-industrial p-6">
                  <h2 className="font-bold text-lg mb-4">Contact Details</h2>
                  {user ? (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <p className="font-semibold">{user.companyName}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-sm text-muted-foreground">Account: {user.accountNumber}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" required className="mt-1" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="company">Company Name (Optional)</Label>
                        <Input id="company" className="mt-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Delivery Address */}
                <div className="card-industrial p-6">
                  <h2 className="font-bold text-lg mb-4">Delivery Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="address1">Address Line 1</Label>
                      <Input id="address1" required className="mt-1" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                      <Input id="address2" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input id="postcode" required className="mt-1" />
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="card-industrial p-6">
                  <h2 className="font-bold text-lg mb-4">Delivery Method</h2>
                  <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                    <div className="space-y-3">
                      {deliveryOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                            deliveryMethod === option.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-muted-foreground/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <div>
                              <p className="font-semibold">{option.name}</p>
                              <p className="text-sm text-muted-foreground">{option.time}</p>
                            </div>
                          </div>
                          <span className="font-bold">
                            {option.price === 0 ? "FREE" : `£${option.price.toFixed(2)}`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment */}
                <div className="card-industrial p-6">
                  <h2 className="font-bold text-lg mb-4">Payment</h2>
                  {user ? (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        <span className="font-semibold">Trade Account Payment</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This order will be added to your trade account. Payment terms: 30 days.
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Available credit: £{user.creditLimit.toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required className="mt-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="card-industrial sticky top-24">
                  <div className="p-6 border-b border-border">
                    <h2 className="font-bold text-lg">Order Summary</h2>
                  </div>
                  
                  {/* Items */}
                  <div className="p-6 border-b border-border max-h-[300px] overflow-y-auto">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1">{item.name}</p>
                            <p className="text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold ml-4">
                            £{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="p-6 space-y-4">
                    {/* VAT Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="vat-toggle-checkout"
                          checked={showVat}
                          onCheckedChange={setShowVat}
                        />
                        <Label htmlFor="vat-toggle-checkout" className="text-sm cursor-pointer">
                          Show inc. VAT
                        </Label>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>£{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <span>{deliveryCost === 0 ? "FREE" : `£${deliveryCost.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">VAT (20%)</span>
                        <span>£{vatAmount.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">£{orderTotal.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {showVat ? "Including VAT" : "Excluding VAT"}
                      </p>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full btn-accent h-12 font-semibold"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Place Order
                        </>
                      )}
                    </Button>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-4 pt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" />
                        Secure
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        Track & Trace
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
