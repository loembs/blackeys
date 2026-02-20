import { useState } from "react";
import { Button } from "@/components/ui/button";
import VehicleCard from "./VehicleCard";
import { useVehicles } from "@/hooks/useVehicles";

const VehiclesSection = () => {
  const [activeTab, setActiveTab] = useState<"location" | "vente">("location");
  const { location, vente, loading, error } = useVehicles();

  const vehicles = activeTab === "location" ? location : vente;

  return (
    <section id="vehicules" className="py-24 bg-white">
      <div className="container mx-auto px-4">
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

        {error && (
          <div className="text-center py-12 text-destructive max-w-xl mx-auto space-y-2">
            <p className="font-medium">Impossible de charger les véhicules.</p>
            <p className="text-sm opacity-90">{error.message}</p>
            <p className="text-xs text-muted-foreground mt-4">
              Vérifiez le fichier .env et que le schéma SQL a bien été exécuté dans le projet Supabase (tables vehicles, vehicle_images).
            </p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12 text-muted-foreground">
            Chargement des véhicules…
          </div>
        )}

        {!loading && !error && vehicles.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Aucun véhicule disponible pour le moment.
          </div>
        )}

        {!loading && !error && vehicles.length > 0 && (
          <>
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
            <div className="text-center mt-12">
              <Button variant="brandOutline" size="xl">
                Voir Tous les Véhicules
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default VehiclesSection;
