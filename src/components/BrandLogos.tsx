const brands = [
  { name: "Bosch", logo: "BOSCH" },
  { name: "LuK", logo: "LuK" },
  { name: "INA", logo: "INA" },
  { name: "Pierburg", logo: "PIERBURG" },
  { name: "Brembo", logo: "BREMBO" },
  { name: "Sachs", logo: "SACHS" },
  { name: "Garrett", logo: "GARRETT" },
  { name: "Denso", logo: "DENSO" },
];

const BrandLogos = () => {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container">
        <div className="text-center mb-8">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Trusted OE Suppliers
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group cursor-pointer"
            >
              <span className="font-black text-2xl md:text-3xl text-chrome/50 group-hover:text-primary transition-colors duration-300 tracking-tight">
                {brand.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
