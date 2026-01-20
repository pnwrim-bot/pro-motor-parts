import { useState } from "react";
import { Plus, Check, ShoppingCart, Package, Wrench, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface KitItem {
  id: string;
  name: string;
  partNumber: string;
  price: number;
  required: boolean;
  recommended: boolean;
  category: "essential" | "recommended" | "optional";
  description?: string;
}

interface KitBuilderSidebarProps {
  mainProduct: {
    name: string;
    partNumber: string;
    price: number;
  };
  kitItems: KitItem[];
  onAddToCart?: (items: string[]) => void;
}

const KitBuilderSidebar = ({ mainProduct, kitItems, onAddToCart }: KitBuilderSidebarProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    kitItems.filter(item => item.required || item.recommended).map(item => item.id)
  );

  const toggleItem = (itemId: string) => {
    const item = kitItems.find(i => i.id === itemId);
    if (item?.required) return; // Can't deselect required items
    
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectedKitItems = kitItems.filter(item => selectedItems.includes(item.id));
  const kitTotal = selectedKitItems.reduce((sum, item) => sum + item.price, 0);
  const fullTotal = mainProduct.price + kitTotal;
  
  const savings = selectedKitItems.length >= 3 ? fullTotal * 0.05 : 0; // 5% discount for 3+ items
  const finalTotal = fullTotal - savings;

  const essentialItems = kitItems.filter(i => i.category === "essential");
  const recommendedItems = kitItems.filter(i => i.category === "recommended");
  const optionalItems = kitItems.filter(i => i.category === "optional");

  const renderItemGroup = (items: KitItem[], title: string, icon: React.ReactNode) => {
    if (items.length === 0) return null;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {icon}
          {title}
        </div>
        {items.map(item => (
          <label
            key={item.id}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
              selectedItems.includes(item.id)
                ? "bg-primary/5 border-primary/30"
                : "border-border hover:border-muted-foreground/30"
            } ${item.required ? "opacity-90" : ""}`}
          >
            <Checkbox
              checked={selectedItems.includes(item.id)}
              onCheckedChange={() => toggleItem(item.id)}
              disabled={item.required}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm line-clamp-1">{item.name}</span>
                {item.required && (
                  <span className="text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded font-semibold">
                    Required
                  </span>
                )}
                {item.description && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-[200px] text-sm">{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono text-xs text-muted-foreground">{item.partNumber}</span>
                <span className="font-bold text-sm">£{item.price.toFixed(2)}</span>
              </div>
            </div>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="card-industrial overflow-hidden sticky top-4">
      <div className="bg-accent/10 px-4 py-3 border-b border-accent/20">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-foreground">Complete the Job</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Add related parts for a professional repair
        </p>
      </div>

      <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
        {/* Main Product */}
        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 mb-1">
            <Check className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm">Main Product</span>
          </div>
          <p className="text-sm font-medium line-clamp-1">{mainProduct.name}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="font-mono text-xs text-muted-foreground">{mainProduct.partNumber}</span>
            <span className="font-bold">£{mainProduct.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Kit Items by Category */}
        {renderItemGroup(essentialItems, "Essential", <Wrench className="w-4 h-4" />)}
        {renderItemGroup(recommendedItems, "Recommended", <Plus className="w-4 h-4" />)}
        {renderItemGroup(optionalItems, "Optional Upgrades", <Package className="w-4 h-4" />)}
      </div>

      {/* Totals */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Main Product</span>
            <span>£{mainProduct.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Kit Items ({selectedKitItems.length})
            </span>
            <span>£{kitTotal.toFixed(2)}</span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Bundle Discount (5%)</span>
              <span>-£{savings.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-border font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">£{finalTotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-muted-foreground">exc. VAT</p>
        </div>

        <Button 
          className="w-full btn-accent mt-4 h-12 font-semibold"
          onClick={() => onAddToCart?.([mainProduct.partNumber, ...selectedItems])}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add Kit to Cart
        </Button>

        {savings === 0 && selectedKitItems.length < 3 && (
          <p className="text-xs text-center text-muted-foreground mt-2">
            Add {3 - selectedKitItems.length} more item{3 - selectedKitItems.length > 1 ? "s" : ""} for 5% bundle discount
          </p>
        )}
      </div>
    </div>
  );
};

export default KitBuilderSidebar;
