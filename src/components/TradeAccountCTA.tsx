import { CheckCircle, ArrowRight, Users, Truck, FileText, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Percent, text: "Trade Net Pricing (exc. VAT)" },
  { icon: Truck, text: "Priority Next-Day Delivery" },
  { icon: FileText, text: "Technical Data Sheets & Diagrams" },
  { icon: Users, text: "Dedicated Account Manager" },
];

const TradeAccountCTA = () => {
  return (
    <section className="py-20 hero-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
              For Workshops & Mechanics
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-arctic mb-6 leading-tight">
              Join 15,000+ Trade Professionals
            </h2>
            <p className="text-lg text-chrome mb-8 max-w-lg">
              Get exclusive trade pricing, technical documentation, and priority access to hard-to-find OE components. Apply in 2 minutes.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-arctic text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-accent h-12 px-8 text-base font-bold">
                Apply for Trade Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="h-12 px-8 text-base font-semibold border-arctic/30 text-arctic hover:bg-arctic/10">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right - Stats Card */}
          <div className="bg-card rounded-2xl p-8 shadow-elevated">
            <h3 className="text-xl font-bold text-foreground mb-6">Trade Account Benefits</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                <div>
                  <div className="text-3xl font-black text-primary">15-30%</div>
                  <div className="text-sm text-muted-foreground">Average savings vs retail</div>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                <div>
                  <div className="text-3xl font-black text-foreground">30 Days</div>
                  <div className="text-sm text-muted-foreground">Credit terms available</div>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                <div>
                  <div className="text-3xl font-black text-foreground">£50+</div>
                  <div className="text-sm text-muted-foreground">Free delivery threshold</div>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Instant account approval for verified businesses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradeAccountCTA;
