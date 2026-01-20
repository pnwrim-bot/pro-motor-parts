import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Heart, Share2, Check, FileText, Download, Star, Truck, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TechnicalSpecsTable from "@/components/pdp/TechnicalSpecsTable";
import ExplodedDiagram from "@/components/pdp/ExplodedDiagram";
import FitmentVerification from "@/components/pdp/FitmentVerification";
import KitBuilderSidebar from "@/components/pdp/KitBuilderSidebar";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

// Mock product data
const mockProducts: Record<string, {
  name: string;
  brand: string;
  partNumber: string;
  oeNumbers: string[];
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockQty: number;
  isOeQuality: boolean;
  images: string[];
  category: string;
  description: string;
  specifications: { label: string; value: string; highlight?: boolean }[];
  compatibleVehicles: string[];
  diagramHotspots: { id: string; x: number; y: number; label: string; partNumber: string }[];
  kitItems: {
    id: string;
    name: string;
    partNumber: string;
    price: number;
    required: boolean;
    recommended: boolean;
    category: "essential" | "recommended" | "optional";
    description?: string;
  }[];
  datasheets: { name: string; size: string; url: string }[];
}> = {
  "BRK-VW-001": {
    name: "Performance Brake Pad Set - Front Axle",
    brand: "Brembo",
    partNumber: "BRK-VW-001",
    oeNumbers: ["8V0698151B", "5Q0698151Q", "WHT003856"],
    price: 89.99,
    originalPrice: 119.99,
    inStock: true,
    stockQty: 47,
    isOeQuality: true,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=600&fit=crop"
    ],
    category: "Brakes",
    description: "Premium OE-quality front brake pads featuring advanced ceramic compound for superior stopping power and minimal dust. Designed for high-performance vehicles with sport-tuned suspension. ECE R90 approved for EU road use.",
    specifications: [
      { label: "Manufacturer", value: "Brembo", highlight: true },
      { label: "Part Number", value: "BRK-VW-001" },
      { label: "OE Reference", value: "8V0698151B" },
      { label: "Position", value: "Front Axle" },
      { label: "Width", value: "155.1 mm" },
      { label: "Height", value: "63.9 mm" },
      { label: "Thickness", value: "20.0 mm" },
      { label: "Wear Indicator", value: "Yes - Integrated" },
      { label: "Certification", value: "ECE R90", highlight: true },
      { label: "Friction Material", value: "Ceramic" },
      { label: "Weight", value: "2.4 kg" },
      { label: "Warranty", value: "2 Years / 30,000 km" }
    ],
    compatibleVehicles: [
      "VW Golf VII GTI (2013-2020)",
      "VW Golf VIII GTI (2020+)",
      "Audi A3 8V (2012+)",
      "Audi S3 8V (2013+)",
      "Seat Leon Cupra (2014+)",
      "Skoda Octavia RS (2013+)"
    ],
    diagramHotspots: [
      { id: "1", x: 25, y: 30, label: "Brake Pad Set", partNumber: "BRK-VW-001" },
      { id: "2", x: 45, y: 45, label: "Brake Disc", partNumber: "DSC-VW-001" },
      { id: "3", x: 65, y: 35, label: "Caliper Carrier", partNumber: "CAL-VW-001" },
      { id: "4", x: 35, y: 65, label: "Pad Wear Sensor", partNumber: "SEN-VW-001" },
      { id: "5", x: 75, y: 60, label: "Pad Retaining Clip", partNumber: "CLP-VW-001" }
    ],
    kitItems: [
      {
        id: "wear-sensor",
        name: "Brake Pad Wear Sensor",
        partNumber: "SEN-VW-001",
        price: 12.99,
        required: true,
        recommended: true,
        category: "essential",
        description: "Required for brake warning system"
      },
      {
        id: "pad-clips",
        name: "Pad Retaining Clip Set",
        partNumber: "CLP-VW-001",
        price: 8.49,
        required: false,
        recommended: true,
        category: "essential",
        description: "Prevents brake squeal and ensures proper pad alignment"
      },
      {
        id: "brake-cleaner",
        name: "Brake Cleaner Spray 500ml",
        partNumber: "CHM-CLN-001",
        price: 6.99,
        required: false,
        recommended: true,
        category: "recommended",
        description: "For cleaning components during installation"
      },
      {
        id: "copper-grease",
        name: "Copper Anti-Seize Grease",
        partNumber: "CHM-GRS-001",
        price: 4.99,
        required: false,
        recommended: false,
        category: "recommended"
      },
      {
        id: "brake-disc",
        name: "Brake Disc Pair - Front",
        partNumber: "DSC-VW-001",
        price: 129.99,
        required: false,
        recommended: false,
        category: "optional",
        description: "Upgrade to new discs for optimal performance"
      }
    ],
    datasheets: [
      { name: "Technical Data Sheet", size: "1.2 MB", url: "#" },
      { name: "Fitting Instructions", size: "2.8 MB", url: "#" },
      { name: "Safety Data Sheet", size: "0.5 MB", url: "#" }
    ]
  }
};

const ProductDetail = () => {
  const { partNumber } = useParams<{ partNumber: string }>();
  const product = mockProducts[partNumber || ""] || mockProducts["BRK-VW-001"];
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id: product.partNumber,
      partNumber: product.partNumber,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0],
      inStock: product.inStock
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleKitAddToCart = (items: string[]) => {
    // Add main product
    addItem({
      id: product.partNumber,
      partNumber: product.partNumber,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0],
      inStock: product.inStock
    });
    
    // Add selected kit items
    items.forEach(itemId => {
      const kitItem = product.kitItems.find(k => k.id === itemId);
      if (kitItem) {
        addItem({
          id: kitItem.partNumber,
          partNumber: kitItem.partNumber,
          name: kitItem.name,
          brand: product.brand,
          price: kitItem.price,
          inStock: true
        });
      }
    });
    
    toast({
      title: "Kit added to cart",
      description: `${items.length + 1} items have been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary/50 border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                {product.category}
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{product.partNumber}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to search</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Header */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className="card-industrial overflow-hidden">
                  <div className="relative aspect-square bg-muted/30 p-6">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isOeQuality && (
                        <span className="badge-oe px-2 py-1 rounded text-xs font-bold">
                          OE QUALITY
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">
                          SAVE £{(product.originalPrice - product.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Thumbnail Row */}
                  {product.images.length > 1 && (
                    <div className="flex gap-2 p-4 border-t border-border">
                      {product.images.map((img, idx) => (
                        <button
                          key={idx}
                          className="w-16 h-16 rounded border-2 border-primary/30 overflow-hidden"
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        {product.category}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs font-bold text-primary">{product.brand}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-3">
                      {product.name}
                    </h1>
                    
                    {/* Ratings */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${star <= 4 ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">(127 reviews)</span>
                    </div>
                  </div>

                  {/* Part Numbers */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Part No:</span>
                      <span className="font-mono font-bold text-foreground">{product.partNumber}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.oeNumbers.map((oe, idx) => (
                        <span key={idx} className="text-xs text-muted-foreground font-mono bg-secondary px-1.5 py-0.5 rounded">
                          OE: {oe}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2">
                    {product.inStock ? (
                      <>
                        <span className="badge-stock px-3 py-1.5 rounded flex items-center gap-1.5">
                          <Check className="w-4 h-4" />
                          IN STOCK
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {product.stockQty} available
                        </span>
                      </>
                    ) : (
                      <span className="bg-muted text-muted-foreground px-3 py-1.5 rounded text-sm font-semibold">
                        2-3 DAYS DELIVERY
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-black text-foreground">
                        £{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          £{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">exc. VAT</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1 btn-primary h-12 font-semibold"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 pt-4">
                    <div className="text-center p-2 bg-secondary/50 rounded">
                      <Truck className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <span className="text-xs font-medium">Free Delivery</span>
                    </div>
                    <div className="text-center p-2 bg-secondary/50 rounded">
                      <Shield className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <span className="text-xs font-medium">2 Year Warranty</span>
                    </div>
                    <div className="text-center p-2 bg-secondary/50 rounded">
                      <RefreshCw className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <span className="text-xs font-medium">Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fitment Verification */}
              <FitmentVerification
                partNumber={product.partNumber}
                compatibleVehicles={product.compatibleVehicles}
              />

              {/* Tabs Section */}
              <Tabs defaultValue="specs" className="w-full">
                <TabsList className="w-full justify-start bg-secondary/50 p-1 rounded-lg">
                  <TabsTrigger value="specs" className="font-semibold">Specifications</TabsTrigger>
                  <TabsTrigger value="diagram" className="font-semibold">Exploded Diagram</TabsTrigger>
                  <TabsTrigger value="datasheets" className="font-semibold">Data Sheets</TabsTrigger>
                </TabsList>
                
                <TabsContent value="specs" className="mt-4">
                  <TechnicalSpecsTable specifications={product.specifications} />
                </TabsContent>
                
                <TabsContent value="diagram" className="mt-4">
                  <ExplodedDiagram
                    diagramUrl="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
                    hotspots={product.diagramHotspots}
                    onHotspotClick={(pn) => console.log("Clicked:", pn)}
                  />
                </TabsContent>
                
                <TabsContent value="datasheets" className="mt-4">
                  <div className="card-industrial">
                    <div className="bg-secondary px-4 py-3 border-b border-border">
                      <h3 className="font-bold text-foreground">Technical Documentation</h3>
                    </div>
                    <div className="divide-y divide-border">
                      {product.datasheets.map((doc, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">PDF • {doc.size}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Description */}
              <div className="card-industrial p-6">
                <h3 className="font-bold text-lg mb-3">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Sidebar - Kit Builder */}
            <div className="lg:col-span-1">
              <KitBuilderSidebar
                mainProduct={{
                  name: product.name,
                  partNumber: product.partNumber,
                  price: product.price
                }}
                kitItems={product.kitItems}
                onAddToCart={handleKitAddToCart}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
