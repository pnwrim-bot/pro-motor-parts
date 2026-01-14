import { useState } from "react";
import { Search, Car, Cog, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchTab = "vrm" | "engine" | "part";

const HeroSearch = () => {
  const [activeTab, setActiveTab] = useState<SearchTab>("vrm");
  const [searchValue, setSearchValue] = useState("");

  const tabs = [
    { key: "vrm" as SearchTab, label: "Vehicle Reg", icon: Car, placeholder: "Enter reg e.g. AB12 CDE" },
    { key: "engine" as SearchTab, label: "Engine Code", icon: Cog, placeholder: "Enter engine code e.g. CFGB" },
    { key: "part" as SearchTab, label: "Part Number", icon: Hash, placeholder: "Enter OE or part number" },
  ];

  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Hero Text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-arctic mb-4 tracking-tight">
            Precision Parts.
            <span className="block gradient-text-cyan">Professional Supply.</span>
          </h1>
          <p className="text-lg md:text-xl text-chrome mb-10 max-w-xl mx-auto">
            Over 100,000 OE-quality parts with verified fitment data. Search by registration, engine code, or part number.
          </p>

          {/* Search Card */}
          <div className="bg-card rounded-xl shadow-elevated overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 font-semibold text-sm transition-all ${
                    activeTab === tab.key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="p-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={tabs.find(t => t.key === activeTab)?.placeholder}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-12 h-14 text-lg border-2 border-border focus:border-primary"
                  />
                </div>
                <Button className="h-14 px-8 btn-accent text-base font-bold">
                  Search Parts
                </Button>
              </div>

              {/* Quick Links */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground">Popular:</span>
                <a href="#" className="px-3 py-1 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  Timing Belt Kit
                </a>
                <a href="#" className="px-3 py-1 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  Water Pump
                </a>
                <a href="#" className="px-3 py-1 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  Clutch Kit
                </a>
                <a href="#" className="px-3 py-1 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  Brake Pads
                </a>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-arctic">100K+</div>
              <div className="text-sm text-chrome mt-1">Parts in Stock</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-primary">98%</div>
              <div className="text-sm text-chrome mt-1">Next-Day Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-arctic">15K+</div>
              <div className="text-sm text-chrome mt-1">Trade Accounts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 33.3C840 36.7 960 43.3 1080 45C1200 46.7 1320 43.3 1380 41.7L1440 40V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="hsl(220 20% 97%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSearch;
