import { ShoppingCart, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  brand: string;
  partNumber: string;
  oeNumbers: string[];
  price: number;
  originalPrice?: number;
  inStock: boolean;
  isOeQuality?: boolean;
  image: string;
  category: string;
}

const ProductCard = ({
  name,
  brand,
  partNumber,
  oeNumbers,
  price,
  originalPrice,
  inStock,
  isOeQuality = false,
  image,
  category,
}: ProductCardProps) => {
  return (
    <div className="card-industrial group transition-all duration-300 hover:scale-[1.02]">
      {/* Image Section */}
      <div className="relative aspect-square bg-secondary/30 p-4 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOeQuality && (
            <span className="badge-oe px-2 py-1 rounded text-xs font-bold">
              OE QUALITY
            </span>
          )}
          {originalPrice && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">
              SAVE £{(originalPrice - price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          {inStock ? (
            <span className="badge-stock px-2 py-1 rounded flex items-center gap-1">
              <Check className="w-3 h-3" />
              IN STOCK
            </span>
          ) : (
            <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-semibold">
              2-3 DAYS
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category & Brand */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {category}
          </span>
          <span className="text-xs font-bold text-primary">{brand}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Part Numbers */}
        <div className="mb-3">
          <div className="font-mono text-sm text-foreground">{partNumber}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {oeNumbers.slice(0, 2).map((oe, idx) => (
              <span key={idx} className="text-xs text-muted-foreground font-mono bg-secondary px-1.5 py-0.5 rounded">
                {oe}
              </span>
            ))}
            {oeNumbers.length > 2 && (
              <span className="text-xs text-muted-foreground font-mono bg-secondary px-1.5 py-0.5 rounded">
                +{oeNumbers.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-foreground">
                £{price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  £{originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">exc. VAT</span>
          </div>
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>

        {/* Add to Cart */}
        <Button className="w-full btn-primary h-11 font-semibold">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
