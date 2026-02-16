import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Fuel, Users, Settings2 } from "lucide-react";

interface VehicleCardProps {
  id: string;
  image: string;
  name: string;
  category: string;
  price: string;
  priceType: "location" | "vente";
  fuel: string;
  seats: number;
  transmission: string;
}

const VehicleCard = ({
  id,
  image,
  name,
  category,
  price,
  priceType,
  fuel,
  seats,
  transmission,
}: VehicleCardProps) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-border/50 hover:border-brand/40 hover-lift shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium bg-brand/20 text-brand rounded-full border border-brand/30">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-brand transition-colors">
          {name}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4 text-brand" />
            <span>{fuel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-brand" />
            <span>{seats} Places</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings2 className="w-4 h-4 text-brand" />
            <span>{transmission}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-serif font-bold text-gradient-brand">{price}</span>
            <span className="text-sm text-muted-foreground ml-1">
              {priceType === "location" ? "/ jour" : ""}
            </span>
          </div>
          <Link to={`/vehicule/${id}`}>
            <Button variant="brandOutline" size="sm">
              {priceType === "location" ? "Réserver" : "Détails"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
