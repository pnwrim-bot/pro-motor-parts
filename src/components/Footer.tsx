import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    shop: ["Engine Parts", "Service Kits", "Drivetrain", "Chassis & Braking", "Workshop & Care", "Electrical"],
    support: ["Contact Us", "Track Order", "Returns Policy", "Shipping Info", "Technical Support", "FAQs"],
    company: ["About Apex", "Trade Accounts", "Careers", "Press & Media", "Partner Program", "Blog"],
    legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
  };

  return (
    <footer className="bg-gunmetal text-arctic">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-black text-xl">A</span>
              </div>
              <div className="ml-2">
                <span className="font-black text-2xl tracking-tight">APEX</span>
                <span className="block text-[10px] font-semibold tracking-[0.2em] text-chrome -mt-1">MOTOR PARTS</span>
              </div>
            </div>
            <p className="text-chrome text-sm mb-6 max-w-xs">
              UK's trusted source for OE-quality automotive parts. Professional supply for workshops and enthusiasts.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a href="tel:+4408001234567" className="flex items-center gap-3 text-chrome hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                0800 123 4567
              </a>
              <a href="mailto:trade@apexmotor.co.uk" className="flex items-center gap-3 text-chrome hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                trade@apexmotor.co.uk
              </a>
              <div className="flex items-start gap-3 text-chrome">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Unit 5, Industrial Estate<br />Birmingham, B45 9AB</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link}>
                  <a href="#" className="text-chrome text-sm hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <a href="#" className="text-chrome text-sm hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-chrome text-sm hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <h4 className="font-bold mb-4">Stay Updated</h4>
            <p className="text-chrome text-sm mb-4">
              Get exclusive trade offers and technical updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-steel/50 border border-steel rounded-lg text-arctic placeholder:text-chrome/60 focus:outline-none focus:border-primary text-sm"
              />
              <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
                Join
              </button>
            </form>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 bg-steel/50 rounded-lg flex items-center justify-center text-chrome hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-steel/50 rounded-lg flex items-center justify-center text-chrome hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-steel/50 rounded-lg flex items-center justify-center text-chrome hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-steel/50 rounded-lg flex items-center justify-center text-chrome hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-steel">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-chrome">
            <span>© 2024 Apex Motor Parts Ltd. All rights reserved.</span>
            {footerLinks.legal.map((link, index) => (
              <span key={link} className="flex items-center gap-4">
                <span className="text-steel">|</span>
                <a href="#" className="hover:text-primary transition-colors">{link}</a>
              </span>
            ))}
          </div>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-chrome mr-2">We Accept:</span>
            <div className="flex gap-2">
              {["Visa", "MC", "Amex", "PayPal"].map((method) => (
                <div key={method} className="px-2 py-1 bg-steel/30 rounded text-xs font-semibold text-chrome">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
