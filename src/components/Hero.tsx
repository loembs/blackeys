import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/car-bmw.jpg";

const Hero = () => {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury Vehicle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/60 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex items-center justify-start h-full">
        <div className="max-w-2xl">
          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-white mb-6 animate-slide-up leading-tight">
            Les Plus Beaux
            <br />
            <span className="text-gradient-brand">Véhicules</span>
            <br />
            de Prestige
          </h1>

          {/* Subheading */}
          <p className="text-lg text-white/80 mb-8 max-w-md animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Découvrez notre sélection exclusive de voitures de luxe pour vos déplacements haut de gamme.
          </p>

          {/* CTA Button */}
          <div className="flex gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/reservation">
              <Button variant="hero" size="lg" className="group">
                Réserver
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="#vehicules">
              <Button variant="brandOutline" size="lg">
                Voir la Flotte
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 rounded-full border-2 border-brand/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-brand rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
