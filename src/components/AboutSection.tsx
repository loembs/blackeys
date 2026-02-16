import { Shield, Award, Clock, HeartHandshake } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Shield,
      title: "Fiabilité",
      description: "Des véhicules rigoureusement entretenus et assurés pour votre sécurité.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Un service haut de gamme qui dépasse vos attentes à chaque instant.",
    },
    {
      icon: Clock,
      title: "Disponibilité",
      description: "Une équipe à votre écoute 24h/24 pour répondre à vos besoins.",
    },
    {
      icon: HeartHandshake,
      title: "Confiance",
      description: "Une relation client basée sur la transparence et le respect.",
    },
  ];

  return (
    <section id="apropos" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-brand font-medium tracking-[0.3em] uppercase text-sm">
              À Propos
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-4 mb-6">
              L'Art du Service <span className="text-brand">Premium</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Depuis plus de 10 ans, BLACKKEYS s'impose comme la référence en
              matière de location et de vente de véhicules de luxe au Sénégal.
              Notre engagement envers l'excellence nous a permis de bâtir une
              réputation solide auprès d'une clientèle exigeante.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Chaque véhicule de notre flotte est sélectionné avec soin pour
              offrir une expérience de conduite exceptionnelle. Notre équipe de
              professionnels passionnés est dédiée à vous accompagner dans tous
              vos projets automobiles.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="text-3xl font-serif font-bold text-brand">50+</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Véhicules</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="text-3xl font-serif font-bold text-brand">10+</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Années</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="text-3xl font-serif font-bold text-brand">5K+</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Clients</div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white border border-border/50 shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                  <value.icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
