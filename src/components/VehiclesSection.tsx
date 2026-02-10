import { useState } from "react";
import { Button } from "@/components/ui/button";
import VehicleCard from "./VehicleCard";
import carRangeRover from "@/assets/car-range-rover.jpg";
import carBmw from "@/assets/car-bmw.jpg";
import carMercedesAmg from "@/assets/car-mercedes-amg.jpg";

export const vehiclesData = {
  location: [
    {
      id: "range-rover-sport",
      image: carRangeRover,
      name: "Range Rover Sport",
      category: "SUV Premium",
      price: "150 000 FCFA",
      priceType: "location" as const,
      fuel: "Diesel",
      seats: 5,
      transmission: "Auto",
      description: "Le Range Rover Sport incarne l'alliance parfaite entre performance et luxe. Son design emblématique et ses capacités tout-terrain en font le choix idéal pour une conduite prestigieuse.",
      features: ["Système audio Meridian", "Toit panoramique", "Sièges chauffants", "Climatisation 4 zones", "Caméra 360°", "Régulateur adaptatif"],
    },
    {
      id: "bmw-serie-7",
      image: carBmw,
      name: "BMW Série 7",
      category: "Berline Luxe",
      price: "120 000 FCFA",
      priceType: "location" as const,
      fuel: "Essence",
      seats: 5,
      transmission: "Auto",
      description: "La BMW Série 7 redéfinit le luxe automobile avec son habitacle raffiné et ses technologies de pointe. Une expérience de conduite incomparable.",
      features: ["Executive Lounge", "Affichage tête haute", "Massage des sièges", "Ambiance lumineuse", "iDrive 8", "Stationnement automatique"],
    },
    {
      id: "mercedes-amg-gt",
      image: carMercedesAmg,
      name: "Mercedes-AMG GT",
      category: "Sport",
      price: "200 000 FCFA",
      priceType: "location" as const,
      fuel: "Essence",
      seats: 2,
      transmission: "Auto",
      description: "La Mercedes-AMG GT est une pure sportive au tempérament de feu. Son moteur V8 biturbo et son design agressif en font une machine de rêve.",
      features: ["Moteur V8 biturbo", "Mode Sport+", "Échappement AMG", "Suspension adaptive", "Freins carbone", "Drive Mode Select"],
    },
  ],
  vente: [
    {
      id: "bmw-serie-7-2024",
      image: carBmw,
      name: "BMW Série 7 2024",
      category: "Neuf",
      price: "85 000 000 FCFA",
      priceType: "vente" as const,
      fuel: "Hybride",
      seats: 5,
      transmission: "Auto",
      description: "La nouvelle BMW Série 7 2024 avec motorisation hybride. Le summum du luxe allemand avec une conscience écologique.",
      features: ["Motorisation hybride", "Conduite autonome niveau 3", "Théâtre arrière", "Porte automatiques", "Crystal headlights", "BMW Operating System 8.5"],
    },
    {
      id: "range-rover-2023",
      image: carRangeRover,
      name: "Range Rover 2023",
      category: "Occasion",
      price: "65 000 000 FCFA",
      priceType: "vente" as const,
      fuel: "Diesel",
      seats: 5,
      transmission: "Auto",
      description: "Range Rover 2023 en excellent état, faible kilométrage. L'élégance britannique avec toutes les options premium.",
      features: ["15 000 km", "Garantie constructeur", "Full options", "Intérieur cuir", "Pack hiver", "Jantes 23 pouces"],
    },
    {
      id: "mercedes-amg-gt-2024",
      image: carMercedesAmg,
      name: "Mercedes-AMG GT 2024",
      category: "Neuf",
      price: "95 000 000 FCFA",
      priceType: "vente" as const,
      fuel: "Essence",
      seats: 2,
      transmission: "Auto",
      description: "La nouvelle génération de la Mercedes-AMG GT. Performance brute et design sculptural pour les passionnés d'automobile.",
      features: ["585 ch", "0-100 km/h en 3.2s", "Pack carbone", "Système audio Burmester", "Mode Track", "Édition limitée"],
    },
  ],
};

const VehiclesSection = () => {
  const [activeTab, setActiveTab] = useState<"location" | "vente">("location");

  const vehicles = activeTab === "location" ? vehiclesData.location : vehiclesData.vente;

  return (
    <section id="vehicules" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand font-medium tracking-[0.3em] uppercase text-sm">
            Notre Flotte
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6">
            Véhicules d'Exception
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de véhicules haut de gamme, disponibles à
            la location ou à la vente. Chaque véhicule est minutieusement
            entretenu pour garantir votre satisfaction.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={activeTab === "location" ? "brand" : "luxury"}
            size="lg"
            onClick={() => setActiveTab("location")}
          >
            Location
          </Button>
          <Button
            variant={activeTab === "vente" ? "brand" : "luxury"}
            size="lg"
            onClick={() => setActiveTab("vente")}
          >
            Vente
          </Button>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <VehicleCard {...vehicle} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="brandOutline" size="xl">
            Voir Tous les Véhicules
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VehiclesSection;
