import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const FilterBar = () => {
    return (
        <div className="w-full max-w-5xl mx-auto py-8 relative z-20">
            <div className="bg-white rounded-xl shadow-luxury p-6 md:p-8 flex flex-col md:flex-row gap-4 items-end animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex-1 w-full space-y-2">
                    <label className="text-sm font-medium text-charcoal/60 ml-1">Toutes les marques</label>
                    <Select>
                        <SelectTrigger className="w-full h-12 bg-secondary/50 border-none focus:ring-1 focus:ring-brand">
                            <SelectValue placeholder="Toutes les marques" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                            <SelectItem value="bmw">BMW</SelectItem>
                            <SelectItem value="range-rover">Range Rover</SelectItem>
                            <SelectItem value="porsche">Porsche</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex-1 w-full space-y-2">
                    <label className="text-sm font-medium text-charcoal/60 ml-1">Tous les types de véhicules</label>
                    <Select>
                        <SelectTrigger className="w-full h-12 bg-secondary/50 border-none focus:ring-1 focus:ring-brand">
                            <SelectValue placeholder="Tous les Types de véhicules" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="berline">Berline de Luxe</SelectItem>
                            <SelectItem value="suv">SUV Premium</SelectItem>
                            <SelectItem value="sport">Sportive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex-1 w-full space-y-2">
                    <label className="text-sm font-medium text-charcoal/60 ml-1">Prix croissant</label>
                    <Select>
                        <SelectTrigger className="w-full h-12 bg-secondary/50 border-none focus:ring-1 focus:ring-brand">
                            <SelectValue placeholder="Prix croissant" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asc">Prix croissant</SelectItem>
                            <SelectItem value="desc">Prix décroissant</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button className="h-12 px-8 bg-brand hover:bg-brand-dark text-white font-bold w-full md:w-auto transition-all">
                    <Search className="w-4 h-4 mr-2" />
                    Rechercher
                </Button>
            </div>
        </div>
    );
};

export default FilterBar;
