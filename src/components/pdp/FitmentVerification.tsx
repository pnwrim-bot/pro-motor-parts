import { useState } from "react";
import { Check, X, AlertTriangle, Car, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FitmentResult {
  status: "confirmed" | "incompatible" | "check-required";
  vehicle?: string;
  message: string;
  notes?: string[];
}

interface FitmentVerificationProps {
  partNumber: string;
  compatibleVehicles: string[];
  onVerify?: (vrm: string) => FitmentResult;
}

const FitmentVerification = ({ partNumber, compatibleVehicles, onVerify }: FitmentVerificationProps) => {
  const [vrm, setVrm] = useState("");
  const [result, setResult] = useState<FitmentResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleVerify = () => {
    if (!vrm.trim()) return;
    
    setIsChecking(true);
    
    // Simulate API check
    setTimeout(() => {
      // Mock verification logic
      const normalizedVrm = vrm.toUpperCase().replace(/\s/g, "");
      
      let verificationResult: FitmentResult;
      
      if (normalizedVrm === "AB12CDE") {
        verificationResult = {
          status: "confirmed",
          vehicle: "2019 VW Golf GTI (DKZA)",
          message: "This part is confirmed to fit your vehicle",
          notes: ["Direct OE replacement", "No modifications required"]
        };
      } else if (normalizedVrm === "MK67XYZ") {
        verificationResult = {
          status: "confirmed",
          vehicle: "2017 BMW 320d M Sport (B47D20A)",
          message: "This part is confirmed to fit your vehicle",
          notes: ["Compatible with M Sport package"]
        };
      } else if (normalizedVrm === "TEST123") {
        verificationResult = {
          status: "incompatible",
          vehicle: "2020 Ford Focus ST",
          message: "This part is NOT compatible with your vehicle",
          notes: ["Alternative part: FP-BRK-002", "Different brake caliper mounting"]
        };
      } else {
        verificationResult = {
          status: "check-required",
          message: "Unable to verify fitment automatically",
          notes: ["Please check part specifications manually", "Contact support for assistance"]
        };
      }
      
      setResult(onVerify?.(vrm) ?? verificationResult);
      setIsChecking(false);
    }, 1500);
  };

  const getStatusIcon = () => {
    switch (result?.status) {
      case "confirmed":
        return <Check className="w-6 h-6" />;
      case "incompatible":
        return <X className="w-6 h-6" />;
      case "check-required":
        return <AlertTriangle className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getStatusStyles = () => {
    switch (result?.status) {
      case "confirmed":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-600";
      case "incompatible":
        return "bg-destructive/10 border-destructive/30 text-destructive";
      case "check-required":
        return "bg-amber-500/10 border-amber-500/30 text-amber-600";
      default:
        return "";
    }
  };

  return (
    <div className="card-industrial overflow-hidden">
      <div className="bg-primary/10 px-4 py-3 border-b border-primary/20">
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">Live Fitment Verification</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your registration to check compatibility
        </p>
      </div>
      
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Input
              value={vrm}
              onChange={(e) => setVrm(e.target.value.toUpperCase())}
              placeholder="Enter VRM (e.g. AB12 CDE)"
              className="uk-plate text-center text-lg h-12 pr-10"
              maxLength={8}
            />
          </div>
          <Button 
            onClick={handleVerify} 
            className="btn-primary h-12 px-6"
            disabled={!vrm.trim() || isChecking}
          >
            {isChecking ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </Button>
        </div>

        {result && (
          <div className={`p-4 rounded-lg border ${getStatusStyles()}`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon()}
              </div>
              <div className="flex-1">
                {result.vehicle && (
                  <p className="font-bold mb-1">{result.vehicle}</p>
                )}
                <p className="font-medium">{result.message}</p>
                {result.notes && result.notes.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {result.notes.map((note, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                        {note}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
            Known Compatible Vehicles
          </p>
          <div className="flex flex-wrap gap-1">
            {compatibleVehicles.slice(0, 6).map((vehicle, idx) => (
              <span 
                key={idx}
                className="text-xs bg-secondary px-2 py-1 rounded font-medium"
              >
                {vehicle}
              </span>
            ))}
            {compatibleVehicles.length > 6 && (
              <span className="text-xs text-muted-foreground px-2 py-1">
                +{compatibleVehicles.length - 6} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitmentVerification;
