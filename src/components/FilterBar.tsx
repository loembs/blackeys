import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FilterBarProps {
  brands: string[];
  categories: string[];
  filterBrand: string;
  filterCategory: string;
  sortOrder: "asc" | "desc" | "";
  onBrandChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: "asc" | "desc" | "") => void;
  onSearch: () => void;
}

const FilterBar = ({
  brands,
  categories,
  filterBrand,
  filterCategory,
  sortOrder,
  onBrandChange,
  onCategoryChange,
  onSortChange,
  onSearch,
}: FilterBarProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 relative z-20">
      <div className="bg-white rounded-xl shadow-luxury p-6 md:p-8 flex flex-col md:flex-row gap-4 items-end animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium text-charcoal/60 ml-1">Marque</label>
          <Select value={filterBrand || "all"} onValueChange={(v) => onBrandChange(v === "all" ? "" : v)}>
            <SelectTrigger className="w-full h-12 bg-secondary/50 border-none focus:ring-1 focus:ring-brand">
              <SelectValue placeholder="Toutes les marques" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les marques</SelectItem>
              {brands.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium text-charcoal/60 ml-1">Type de véhicule</label>
          <Select value={filterCategory || "all"} onValueChange={(v) => onCategoryChange(v === "all" ? "" : v)}>
            <SelectTrigger className="w-full h-12 bg-secondary/50 border-none focus:ring-1 focus:ring-brand">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium text-charcoal/60 ml-1">Tri par prix</label>
          <Select
            value={sortOrder || "none"}
            onValueChange={(v) => onSortChange((v === "none" ? "" : v) as "asc" | "desc" | "")}
          >
            <SelectTrigger className="w-full h-12 bg-secondary/50 border-none focus:ring-1 focus:ring-brand">
              <SelectValue placeholder="Prix" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucun tri</SelectItem>
              <SelectItem value="asc">Prix croissant</SelectItem>
              <SelectItem value="desc">Prix décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="button"
          className="h-12 px-8 bg-brand hover:bg-brand-dark text-white font-bold w-full md:w-auto transition-all"
          onClick={onSearch}
        >
          <Search className="w-4 h-4 mr-2" />
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
