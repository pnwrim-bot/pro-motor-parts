import { Cog, Filter, Settings, Disc, Wrench, Zap } from "lucide-react";

const categories = [
  {
    name: "Engine Parts",
    description: "Pistons, gaskets, valvetrain & turbochargers",
    icon: Cog,
    count: "24,500+",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    name: "Service Kits",
    description: "Filters, plugs, oils & belts",
    icon: Filter,
    count: "18,200+",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    name: "Drivetrain",
    description: "Clutches, CV joints & gearbox",
    icon: Settings,
    count: "15,800+",
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Chassis & Braking",
    description: "Suspension, pads, discs & bearings",
    icon: Disc,
    count: "21,300+",
    color: "from-orange-500 to-orange-600",
  },
  {
    name: "Workshop & Care",
    description: "Tools, equipment & detailing",
    icon: Wrench,
    count: "8,400+",
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Electrical",
    description: "Sensors, starters & alternators",
    icon: Zap,
    count: "12,100+",
    color: "from-yellow-500 to-yellow-600",
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-foreground mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Browse our comprehensive range of OE-quality components organized by system
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href="#"
              className="group relative bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-elevated overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {category.description}
                </p>

                {/* Count */}
                <span className="text-sm font-semibold text-primary">
                  {category.count} parts
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
