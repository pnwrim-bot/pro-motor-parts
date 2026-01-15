import { useState } from "react";
import { 
  Package, 
  FileText, 
  Download, 
  RefreshCw, 
  TrendingUp, 
  Clock, 
  CreditCard,
  LogOut,
  Search,
  ChevronRight,
  Check,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTradeAuth } from "@/contexts/TradeAuthContext";
import { useNavigate } from "react-router-dom";

// Mock order history data
const MOCK_ORDERS = [
  {
    id: "ORD-78234",
    date: "2024-01-12",
    items: [
      { name: "Timing Belt Kit - VAG 2.0 TDI", partNumber: "KTB-7823", qty: 2, netPrice: 89.50 },
      { name: "Water Pump - EA288", partNumber: "WP-4421", qty: 2, netPrice: 42.30 },
    ],
    status: "delivered",
    total: 263.60,
  },
  {
    id: "ORD-78190",
    date: "2024-01-08",
    items: [
      { name: "Brake Pad Set Front - BMW F30", partNumber: "BP-F30-FR", qty: 4, netPrice: 34.20 },
      { name: "Brake Disc Set Front - BMW F30", partNumber: "BD-F30-FR", qty: 2, netPrice: 67.80 },
    ],
    status: "delivered",
    total: 272.40,
  },
  {
    id: "ORD-78102",
    date: "2024-01-03",
    items: [
      { name: "Clutch Kit - Ford Transit 2.2 TDCi", partNumber: "CLK-TRNS22", qty: 1, netPrice: 189.00 },
    ],
    status: "delivered",
    total: 189.00,
  },
  {
    id: "ORD-77998",
    date: "2023-12-28",
    items: [
      { name: "Fuel Filter - Mercedes OM651", partNumber: "FF-OM651", qty: 10, netPrice: 12.40 },
      { name: "Oil Filter - Mercedes OM651", partNumber: "OF-OM651", qty: 10, netPrice: 8.90 },
    ],
    status: "delivered",
    total: 213.00,
  },
];

// Mock technical documents
const MOCK_TECH_DOCS = [
  { id: 1, name: "Timing Belt Installation Guide - VAG 2.0 TDI EA288", type: "PDF", size: "2.4 MB", partNumber: "KTB-7823" },
  { id: 2, name: "Torque Specifications - BMW N47 Engine", type: "PDF", size: "1.1 MB", partNumber: "Various" },
  { id: 3, name: "Brake Pad Bedding Procedure - Performance Pads", type: "PDF", size: "0.8 MB", partNumber: "BP-PERF" },
  { id: 4, name: "Clutch Installation Manual - LuK RepSet", type: "PDF", size: "3.2 MB", partNumber: "CLK-Series" },
  { id: 5, name: "Water Pump Replacement Guide - Common Rail Diesel", type: "PDF", size: "1.8 MB", partNumber: "WP-CRD" },
];

// Mock frequently ordered items
const FREQUENT_ITEMS = [
  { name: "Oil Filter - VAG 1.9/2.0 TDI", partNumber: "OF-VAG20", netPrice: 6.80, retailPrice: 12.99 },
  { name: "Fuel Filter - PSA 1.6 HDi", partNumber: "FF-PSA16", netPrice: 11.20, retailPrice: 21.99 },
  { name: "Air Filter - Ford 2.0 EcoBlue", partNumber: "AF-ECOB20", netPrice: 14.50, retailPrice: 27.99 },
  { name: "Brake Pad Set Rear - VW Golf Mk7", partNumber: "BP-GOLF7R", netPrice: 24.80, retailPrice: 47.99 },
];

const TradeDashboard = () => {
  const { user, logout } = useTradeAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/trade/login");
  };

  const handleReorder = async (orderId: string) => {
    setReorderingId(orderId);
    // Simulate reorder process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setReorderingId(null);
    // Show success (in real app, would add to cart)
    alert(`Order ${orderId} items added to cart!`);
  };

  const handleDownloadPdf = (docName: string) => {
    // Simulate PDF download
    alert(`Downloading: ${docName}`);
  };

  const discountPercentage = {
    bronze: 15,
    silver: 20,
    gold: 25,
    platinum: 30,
  };

  const tierColors = {
    bronze: "bg-amber-700",
    silver: "bg-slate-400",
    gold: "bg-yellow-500",
    platinum: "bg-gradient-to-r from-slate-300 to-slate-500",
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gunmetal text-arctic border-b border-steel/30">
        <div className="container flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-black text-xl">A</span>
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight">APEX</span>
              <span className="block text-[10px] font-semibold tracking-[0.2em] text-chrome -mt-1">TRADE PRO</span>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-semibold">{user.companyName}</p>
              <p className="text-sm text-chrome">Account: {user.accountNumber}</p>
            </div>
            <Badge className={`${tierColors[user.discountTier]} text-white font-bold uppercase`}>
              {user.discountTier}
            </Badge>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-arctic hover:text-primary">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Your Discount</span>
            </div>
            <p className="text-3xl font-black text-foreground">{discountPercentage[user.discountTier]}% OFF</p>
            <p className="text-sm text-muted-foreground">Trade net pricing applied</p>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CreditCard className="h-5 w-5 text-green-500" />
              </div>
              <span className="text-sm text-muted-foreground">Credit Limit</span>
            </div>
            <p className="text-3xl font-black text-foreground">£{user.creditLimit.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Available credit</p>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Package className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">Orders This Month</span>
            </div>
            <p className="text-3xl font-black text-foreground">{MOCK_ORDERS.length}</p>
            <p className="text-sm text-muted-foreground">Total: £{MOCK_ORDERS.reduce((a, b) => a + b.total, 0).toFixed(2)}</p>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <span className="text-sm text-muted-foreground">Payment Terms</span>
            </div>
            <p className="text-3xl font-black text-foreground">30 Days</p>
            <p className="text-sm text-muted-foreground">Net payment terms</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order History */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-foreground">Order History</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-4">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-secondary/50">
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-foreground">{order.id}</span>
                      <span className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString('en-GB')}</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                        <Check className="h-3 w-3 mr-1" />
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-foreground">£{order.total.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground">NET</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-muted-foreground font-mono text-xs">{item.partNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">£{item.netPrice.toFixed(2)} × {item.qty}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-secondary/30 border-t border-border">
                    <Button
                      onClick={() => handleReorder(order.id)}
                      disabled={reorderingId === order.id}
                      className="w-full sm:w-auto btn-primary"
                    >
                      {reorderingId === order.id ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Adding to Cart...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          One-Click Reorder
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Reorder */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Frequently Ordered
              </h3>
              <div className="space-y-3">
                {FREQUENT_ITEMS.map((item) => (
                  <div key={item.partNumber} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{item.partNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">£{item.netPrice.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground line-through">£{item.retailPrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 btn-accent">
                Add All to Cart
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* Technical Documents */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Technical Data Sheets
              </h3>
              <div className="space-y-2">
                {MOCK_TECH_DOCS.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleDownloadPdf(doc.name)}
                    className="w-full flex items-center gap-3 p-3 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors text-left group"
                  >
                    <div className="p-2 bg-red-500/10 rounded-lg shrink-0">
                      <FileText className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </button>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Browse All Documents
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TradeDashboard;
