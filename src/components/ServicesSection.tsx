import ServiceCard from "./ServiceCard";
import chauffeurService from "@/assets/chauffeur-service.jpg";
import airportShuttle from "@/assets/airport-shuttle.jpg";
import excursionSenegal from "@/assets/excursion-senegal.jpg";
import carDecoration from "@/assets/car-decoration.jpg";

const ServicesSection = () => {
  const services = [
    {
      image: "https://res.cloudinary.com/dprbhsvxl/image/upload/v1771616728/Chauffeurprive_gysngl.png",
      title: "Location avec Chauffeur",
      description:
        "Profitez d'un service de chauffeur privé professionnel pour tous vos déplacements en toute élégance.",
      features: [
        "Chauffeurs expérimentés et bilingues",
        "Service disponible 24h/24",
        "Discrétion et ponctualité garanties",
      ],
    },
    {
      image: "https://res.cloudinary.com/dprbhsvxl/image/upload/v1771616723/AIBD_tizrko.png",
      title: "Navette Aéroport AIBD",
      description:
        "Service de transfert premium depuis et vers l'Aéroport International Blaise Diagne.",
      features: [
        "Accueil personnalisé à l'arrivée",
        "Suivi des vols en temps réel",
        "Assistance bagages incluse",
      ],
    },
    {
      image: "https://res.cloudinary.com/dprbhsvxl/image/upload/v1771616786/tourisme_gze5rr.png",
      title: "Excursions au Sénégal",
      description:
        "Explorez les merveilles du Sénégal à bord de nos véhicules tout-terrain de luxe.",
      features: [
        "Circuits sur mesure",
        "Guides touristiques professionnels",
        "Destinations: Lac Rose, Saly, Saint-Louis",
      ],
    },
    {
      image: "https://res.cloudinary.com/dprbhsvxl/image/upload/v1771616771/mariagecar_uaewek.jpg",
      title: "Décoration Événementielle",
      description:
        "Sublimez vos événements avec nos services de décoration de véhicules de prestige.",
      features: [
        "Mariages et cérémonies",
        "Décorations personnalisées",
        "Service photo inclus",
      ],
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand font-medium tracking-[0.3em] uppercase text-sm">
            Nos Services
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6">
            Une Expérience Sur Mesure
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Au-delà de la location et de la vente, nous vous proposons une gamme
            complète de services premium pour répondre à tous vos besoins.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
