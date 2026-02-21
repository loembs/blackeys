import { useState, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VehiclesSection from "@/components/VehiclesSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import { useVehicles } from "@/hooks/useVehicles";
import { getBrandFromName } from "@/lib/constants";

const Index = () => {
  const { all } = useVehicles();
  const [filterBrand, setFilterBrand] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  const brands = useMemo(() => {
    const set = new Set<string>();
    all.forEach((v) => {
      const b = getBrandFromName(v.name);
      if (b) set.add(b);
    });
    return Array.from(set).sort();
  }, [all]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    all.forEach((v) => {
      if (v.category) set.add(v.category);
    });
    return Array.from(set).sort();
  }, [all]);

  const handleSearch = useCallback(() => {
    document.getElementById("vehicules")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FilterBar
          brands={brands}
          categories={categories}
          filterBrand={filterBrand}
          filterCategory={filterCategory}
          sortOrder={sortOrder}
          onBrandChange={setFilterBrand}
          onCategoryChange={setFilterCategory}
          onSortChange={setSortOrder}
          onSearch={handleSearch}
        />
        <VehiclesSection
          filterBrand={filterBrand}
          filterCategory={filterCategory}
          sortOrder={sortOrder}
        />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
