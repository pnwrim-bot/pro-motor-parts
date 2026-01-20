import { useState } from "react";
import { Menu, X, User, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import MegaMenu from "./MegaMenu";
import CartButton from "./cart/CartButton";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const navItems = [
    { label: "Engine Parts", key: "engine" },
    { label: "Service Kits", key: "service" },
    { label: "Drivetrain", key: "drivetrain" },
    { label: "Chassis & Braking", key: "chassis" },
    { label: "Workshop", key: "workshop" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top utility bar */}
      <div className="bg-gunmetal text-arctic">
        <div className="container flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+441onal" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">0800 123 4567</span>
            </a>
            <span className="hidden md:inline text-chrome">Mon-Fri 8am-6pm | Sat 9am-4pm</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/trade/login" className="hover:text-primary transition-colors">Trade Login</a>
            <span className="text-steel">|</span>
            <a href="#" className="hover:text-primary transition-colors">Track Order</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-black text-xl">A</span>
              </div>
              <div className="ml-2">
                <span className="font-black text-2xl tracking-tight text-foreground">APEX</span>
                <span className="block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground -mt-1">MOTOR PARTS</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                className="px-4 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                onMouseEnter={() => setActiveMegaMenu(item.key)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                {item.label}
                <ChevronDown className="h-4 w-4" />
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
            <CartButton />
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mega Menu */}
        {activeMegaMenu && (
          <div 
            className="absolute left-0 right-0 bg-card border-b border-border shadow-elevated"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <MegaMenu category={activeMegaMenu} />
          </div>
        )}
      </div>

      {/* Trust Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-center gap-8 py-2.5 text-sm font-medium overflow-x-auto">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>UK Next-Day Delivery</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 whitespace-nowrap">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Verified Fitment Guarantee</span>
          </div>
          <div className="hidden md:flex items-center gap-2 whitespace-nowrap">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Professional Trade Accounts</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-b border-border animate-slide-in-right">
          <nav className="container py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.key}
                href="#"
                className="block px-4 py-3 text-foreground font-semibold hover:bg-secondary rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              <a href="/trade/login">
                <Button className="w-full btn-accent">Trade Login</Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
