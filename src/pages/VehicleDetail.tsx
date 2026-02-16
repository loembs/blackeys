import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Fuel, Users, Settings2, Check, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { vehiclesData } from "@/components/VehiclesSection";

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the vehicle in both location and vente arrays
  const vehicle = [...vehiclesData.location, ...vehiclesData.vente].find(
    (v) => v.id === id
  );

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Véhicule non trouvé
          </h1>
          <Link to="/#vehicules">
            <Button variant="brand">Retour aux véhicules</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>

        {/* Vehicle Hero */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 text-sm font-medium bg-brand/20 text-brand rounded-full border border-brand/30">
                    {vehicle.category}
                  </span>
                </div>
              </div>
              {/* Thumbnail placeholders */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-brand transition-colors cursor-pointer"
                  >
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.name} vue ${i}`}
                      className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                {vehicle.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-serif font-bold text-gradient-brand">
                  {vehicle.price}
                </span>
                {vehicle.priceType === "location" && (
                  <span className="text-lg text-muted-foreground ml-2">/ jour</span>
                )}
              </div>

              {/* Specs */}
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                    <Fuel className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Carburant</p>
                    <p className="font-medium text-foreground">{vehicle.fuel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Places</p>
                    <p className="font-medium text-foreground">{vehicle.seats} places</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                    <Settings2 className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Transmission</p>
                    <p className="font-medium text-foreground">{vehicle.transmission}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-serif font-bold text-foreground mb-4">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-xl font-serif font-bold text-foreground mb-4">
                  Équipements
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/reservation?vehicule=${vehicle.id}`} className="flex-1">
                  <Button variant="hero" size="xl" className="w-full group">
                    <Calendar className="w-5 h-5" />
                    {vehicle.priceType === "location" ? "Réserver" : "Demander un devis"}
                  </Button>
                </Link>
                <a href="tel:+221770000000" className="flex-1">
                  <Button variant="brandOutline" size="xl" className="w-full">
                    Appeler maintenant
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Vehicles */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-8">
              Véhicules Similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(vehicle.priceType === "location" ? vehiclesData.location : vehiclesData.vente)
                .filter((v) => v.id !== vehicle.id)
                .slice(0, 3)
                .map((v) => (
                  <Link
                    key={v.id}
                    to={`/vehicule/${v.id}`}
                    className="group bg-white rounded-xl overflow-hidden border border-border/50 hover:border-brand/30 hover:shadow-lg transition-all"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif font-bold text-charcoal group-hover:text-brand transition-colors">
                        {v.name}
                      </h3>
                      <p className="text-brand font-bold">{v.price}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VehicleDetail;
