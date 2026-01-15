import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  Car, 
  Calendar, 
  Fuel, 
  Settings, 
  ShieldCheck, 
  Package,
  Filter,
  ChevronDown,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lookupVehicle, getCompatibleParts, formatVrm, VehicleData, CompatiblePart } from "@/lib/vrmLookup";

const VrmResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const vrm = searchParams.get("vrm") || "";
  
  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState<VehicleData | null>(null);
  const [parts, setParts] = useState<CompatiblePart[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const vehicleData = await lookupVehicle(vrm);
      setVehicle(vehicleData);
      
      if (vehicleData) {
        const compatibleParts = await getCompatibleParts(vehicleData.engineCode);
        setParts(compatibleParts);
      }
      setLoading(false);
    }
    
    if (vrm) {
      fetchData();
    }
  }, [vrm]);

  const categories = ["all", ...new Set(parts.map(p => p.category))];
  
  const filteredParts = parts
    .filter(p => categoryFilter === "all" || p.category === categoryFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-lg text-muted-foreground">Looking up vehicle {formatVrm(vrm)}...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Vehicle Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find a vehicle with registration <strong>{formatVrm(vrm)}</strong>. 
              Please check the number plate and try again.
            </p>
            <Button onClick={() => navigate("/")} variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Search
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")} 
          className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          New Search
        </Button>

        {/* Vehicle Card */}
        <div className="bg-card rounded-xl border border-border overflow-hidden mb-8">
          <div className="bg-slate-dark p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Number Plate */}
              <div className="flex-shrink-0">
                <div className="uk-plate text-2xl font-bold tracking-wider">
                  {vehicle.vrm}
                </div>
              </div>
              
              {/* Vehicle Info */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-arctic mb-2">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    <Settings className="w-3 h-3 mr-1" />
                    {vehicle.engineCode}
                  </Badge>
                  <Badge variant="outline" className="bg-background/10 text-chrome border-chrome/30">
                    {vehicle.engineSize}
                  </Badge>
                  <Badge variant="outline" className="bg-background/10 text-chrome border-chrome/30">
                    {vehicle.transmission}
                  </Badge>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-chrome">MOT: {new Date(vehicle.motExpiry).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-chrome">{vehicle.taxStatus}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vehicle Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Year</div>
                <div className="font-semibold">{vehicle.year}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Fuel className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Fuel</div>
                <div className="font-semibold">{vehicle.fuelType}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Body</div>
                <div className="font-semibold">{vehicle.bodyType}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Engine</div>
                <div className="font-semibold">{vehicle.engineSize}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Parts Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter Parts
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat === "all" ? "All Categories" : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm text-green-700">Fitment Guarantee</div>
                    <p className="text-xs text-green-600 mt-1">
                      All parts shown are verified compatible with your {vehicle.make} {vehicle.model}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Parts Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                Compatible Parts
                <span className="text-muted-foreground font-normal ml-2">({filteredParts.length} items)</span>
              </h2>
            </div>

            <div className="grid gap-4">
              {filteredParts.map((part) => (
                <div 
                  key={part.id}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Part Image Placeholder */}
                    <div className="w-full md:w-32 h-32 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-12 h-12 text-muted-foreground" />
                    </div>

                    {/* Part Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {part.isOeQuality && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            OE QUALITY
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {part.category}
                        </Badge>
                        {part.originalPrice && (
                          <Badge className="bg-accent text-accent-foreground text-xs">
                            SAVE £{(part.originalPrice - part.price).toFixed(2)}
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-bold text-lg mb-1">{part.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium">{part.brand}</span> • {part.partNumber}
                      </p>
                      
                      <div className="text-xs text-muted-foreground mb-3">
                        <span className="font-medium">OE Refs:</span>{" "}
                        {part.oeNumbers.slice(0, 2).join(", ")}
                        {part.oeNumbers.length > 2 && ` +${part.oeNumbers.length - 2} more`}
                      </div>

                      {part.fitmentNotes && (
                        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-lg p-2 mb-3">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          {part.fitmentNotes}
                        </div>
                      )}
                    </div>

                    {/* Price & Stock */}
                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        {part.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            £{part.originalPrice.toFixed(2)}
                          </div>
                        )}
                        <div className="text-2xl font-bold text-primary">
                          £{part.price.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">ex. VAT</div>
                      </div>

                      <div className="mt-4 text-right">
                        {part.inStock ? (
                          <div className="flex items-center gap-1 text-sm text-green-600 mb-2">
                            <CheckCircle2 className="w-4 h-4" />
                            In Stock ({part.stockCount})
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-sm text-amber-600 mb-2">
                            <AlertCircle className="w-4 h-4" />
                            Out of Stock
                          </div>
                        )}
                        <Button 
                          className="btn-accent"
                          disabled={!part.inStock}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VrmResults;
