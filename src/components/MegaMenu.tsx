import { Cog, Filter, Gauge, Settings, Wrench, Disc, CircleDot, Box } from "lucide-react";

interface MegaMenuProps {
  category: string;
}

const menuData: Record<string, { title: string; icon: React.ReactNode; subcategories: { name: string; items: string[] }[] }> = {
  engine: {
    title: "Engine Parts",
    icon: <Cog className="w-6 h-6" />,
    subcategories: [
      { name: "Cylinder Head", items: ["Valves & Guides", "Camshafts", "Rocker Arms", "Head Gaskets", "Valve Seals"] },
      { name: "Engine Block", items: ["Pistons & Rings", "Connecting Rods", "Crankshafts", "Bearings", "Oil Pumps"] },
      { name: "Timing System", items: ["Timing Chains", "Timing Belts", "Tensioners", "Sprockets", "Complete Kits"] },
      { name: "Forced Induction", items: ["Turbochargers", "Superchargers", "Intercoolers", "Wastegates", "Boost Controllers"] },
    ],
  },
  service: {
    title: "Service Kits",
    icon: <Filter className="w-6 h-6" />,
    subcategories: [
      { name: "Filters", items: ["Oil Filters", "Air Filters", "Fuel Filters", "Cabin Filters", "Filter Kits"] },
      { name: "Ignition", items: ["Spark Plugs", "Ignition Coils", "HT Leads", "Glow Plugs", "Ignition Modules"] },
      { name: "Fluids & Oils", items: ["Engine Oils", "Transmission Fluids", "Brake Fluids", "Coolants", "Power Steering"] },
      { name: "Belts", items: ["Auxiliary Belts", "Belt Tensioners", "Idler Pulleys", "Belt Kits", "Damper Pulleys"] },
    ],
  },
  drivetrain: {
    title: "Drive & Transmission",
    icon: <Settings className="w-6 h-6" />,
    subcategories: [
      { name: "Clutch System", items: ["Clutch Kits", "Flywheels", "Release Bearings", "Slave Cylinders", "Clutch Cables"] },
      { name: "Driveshafts", items: ["CV Joints", "Driveshaft Assemblies", "CV Boots", "Universal Joints", "Centre Bearings"] },
      { name: "Gearbox", items: ["Gearbox Mounts", "Gear Linkages", "Synchronizers", "Bearings", "Seals & Gaskets"] },
      { name: "Differential", items: ["Diff Mounts", "Bearings", "Seals", "LSD Units", "Final Drives"] },
    ],
  },
  chassis: {
    title: "Chassis & Braking",
    icon: <Disc className="w-6 h-6" />,
    subcategories: [
      { name: "Braking", items: ["Brake Pads", "Brake Discs", "Calipers", "Brake Lines", "Master Cylinders"] },
      { name: "Suspension", items: ["Shock Absorbers", "Coil Springs", "Control Arms", "Ball Joints", "Anti-Roll Bars"] },
      { name: "Steering", items: ["Steering Racks", "Track Rods", "Power Steering Pumps", "Steering Columns", "Tie Rod Ends"] },
      { name: "Wheel Bearings", items: ["Front Bearings", "Rear Bearings", "Hub Assemblies", "Bearing Kits", "ABS Sensors"] },
    ],
  },
  workshop: {
    title: "Workshop & Care",
    icon: <Wrench className="w-6 h-6" />,
    subcategories: [
      { name: "Hand Tools", items: ["Socket Sets", "Spanners", "Screwdrivers", "Pliers", "Specialty Tools"] },
      { name: "Power Tools", items: ["Impact Wrenches", "Drills", "Grinders", "Sanders", "Air Tools"] },
      { name: "Garage Equipment", items: ["Jacks & Stands", "Engine Cranes", "Diagnostic Tools", "Workbenches", "Lighting"] },
      { name: "Car Care", items: ["Cleaning Products", "Polishes", "Waxes", "Interior Care", "Detailing Kits"] },
    ],
  },
};

const MegaMenu = ({ category }: MegaMenuProps) => {
  const data = menuData[category];
  if (!data) return null;

  return (
    <div className="container py-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
          {data.icon}
        </div>
        <h3 className="text-xl font-bold text-foreground">{data.title}</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {data.subcategories.map((subcat) => (
          <div key={subcat.name}>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <CircleDot className="w-4 h-4 text-primary" />
              {subcat.name}
            </h4>
            <ul className="space-y-2">
              {subcat.items.map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
        <a href="#" className="text-primary font-semibold hover:underline flex items-center gap-2">
          View all {data.title}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Box className="w-4 h-4" />
            50,000+ Parts in Stock
          </span>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
