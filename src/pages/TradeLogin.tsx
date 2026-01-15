import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Shield, Truck, Percent, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTradeAuth } from "@/contexts/TradeAuthContext";

const TradeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useTradeAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      navigate("/trade/dashboard");
    } else {
      setError("Invalid email or password. Try: trade@apexmotors.co.uk / trade123");
    }
    setIsLoading(false);
  };

  const benefits = [
    { icon: Percent, title: "Net Trade Pricing", desc: "Exclusive wholesale rates" },
    { icon: Truck, title: "Priority Dispatch", desc: "Same-day processing" },
    { icon: FileText, title: "Technical PDFs", desc: "Instant downloads" },
    { icon: Shield, title: "Credit Account", desc: "30-day payment terms" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gunmetal text-arctic p-12 flex-col justify-between">
        <div>
          <a href="/" className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-black text-xl">A</span>
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight">APEX</span>
              <span className="block text-[10px] font-semibold tracking-[0.2em] text-chrome -mt-1">MOTOR PARTS</span>
            </div>
          </a>

          <h1 className="text-4xl font-black mb-4">Trade Pro Dashboard</h1>
          <p className="text-chrome text-lg mb-12">
            Access exclusive trade pricing, manage orders, and download technical documentation.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-steel/20 rounded-xl p-5">
                <benefit.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                <p className="text-chrome text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-steel text-sm">
          Not a trade customer? <a href="#" className="text-primary hover:underline">Apply for an account</a>
        </p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <a href="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-black text-xl">A</span>
              </div>
              <div>
                <span className="font-black text-2xl tracking-tight">APEX</span>
                <span className="block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground -mt-1">MOTOR PARTS</span>
              </div>
            </a>
          </div>

          <h2 className="text-3xl font-black text-foreground mb-2">Trade Login</h2>
          <p className="text-muted-foreground mb-8">
            Sign in to access your trade account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-12 btn-accent text-base font-bold" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Demo Credentials:</strong><br />
              Email: trade@apexmotors.co.uk<br />
              Password: trade123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeLogin;
