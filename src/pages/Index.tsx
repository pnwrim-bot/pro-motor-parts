import Header from "@/components/Header";
import HeroSearch from "@/components/HeroSearch";
import CategoryGrid from "@/components/CategoryGrid";
import RecentlyRestocked from "@/components/RecentlyRestocked";
import BrandLogos from "@/components/BrandLogos";
import TradeAccountCTA from "@/components/TradeAccountCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSearch />
        <CategoryGrid />
        <RecentlyRestocked />
        <BrandLogos />
        <TradeAccountCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
