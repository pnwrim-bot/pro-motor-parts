import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    name: "Timing Chain Kit - Complete with Tensioner",
    brand: "INA",
    partNumber: "559 0027 30",
    oeNumbers: ["06H109158J", "06H109469T", "06H109469AQ"],
    price: 189.95,
    originalPrice: 229.99,
    inStock: true,
    isOeQuality: true,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop",
    category: "Timing System",
  },
  {
    name: "Water Pump with Thermostat Housing",
    brand: "PIERBURG",
    partNumber: "7.02851.20.0",
    oeNumbers: ["06H121026DD", "06H121026CQ"],
    price: 156.50,
    inStock: true,
    isOeQuality: true,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop",
    category: "Cooling System",
  },
  {
    name: "Turbocharger Garrett - Reconditioned",
    brand: "GARRETT",
    partNumber: "775517-5002S",
    oeNumbers: ["03L253016T", "03L253016TX"],
    price: 449.00,
    originalPrice: 599.00,
    inStock: true,
    isOeQuality: true,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    category: "Turbochargers",
  },
  {
    name: "Clutch Kit 3-Piece with Flywheel",
    brand: "LUK",
    partNumber: "600 0166 00",
    oeNumbers: ["0A5141031N", "0A5141031K"],
    price: 324.99,
    inStock: true,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
    category: "Clutch System",
  },
  {
    name: "Front Brake Disc Set - Vented 340mm",
    brand: "BREMBO",
    partNumber: "09.B506.11",
    oeNumbers: ["1K0615301AK", "1K0615301AA"],
    price: 94.50,
    originalPrice: 112.00,
    inStock: false,
    isOeQuality: true,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop",
    category: "Braking",
  },
  {
    name: "Air Mass Sensor - Hot Film Type",
    brand: "BOSCH",
    partNumber: "0 281 006 147",
    oeNumbers: ["03L906461A", "03L906461"],
    price: 89.95,
    inStock: true,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop",
    category: "Engine Management",
  },
];

const RecentlyRestocked = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-foreground mb-2">
              Recently Restocked
            </h2>
            <p className="text-muted-foreground">
              High-demand technical parts just back in stock with verified fitment data
            </p>
          </div>
          <Button variant="outline" className="group">
            View All Stock
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.partNumber} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 p-6 bg-gunmetal rounded-xl">
            <div className="text-left">
              <h3 className="text-arctic font-bold text-lg">Looking for a specific part?</h3>
              <p className="text-chrome text-sm">Our technical team can source any OE or aftermarket component</p>
            </div>
            <Button className="btn-accent whitespace-nowrap">
              Request Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyRestocked;
