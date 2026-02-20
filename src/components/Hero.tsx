import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FilterBar from "./FilterBar";
import heroImage from "@/assets/hero-car.jpg";

const Hero = () => {
  return (
    <section
      id="accueil"
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-none"
    >
      {/* Image Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://res.cloudinary.com/dprbhsvxl/image/upload/v1771617399/Location_de_voiture_et_tourisme_s%C3%A9n%C3%A9galais_ghe5kg.png"
          alt="Luxury Vehicle"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-32 left-0 right-0 z-30 hidden md:flex justify-center px-6">
        <img
          src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1771340863/IMG_2675-removebg-preview_pg0lgu.png"
          alt="BLACKEYS"
          className="h-28 w-auto object-contain animate-float"
        />
      </div>
      {/* CTA Buttons - Absolute bottom */}
      <div className="absolute bottom-12 left-0 right-0 z-30 px-6">
        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Link to="/reservation" className="w-full sm:w-auto">
            <Button size="xl" className="group bg-brand hover:bg-brand-dark text-white font-bold px-10 shadow-lg hover:shadow-brand transition-all duration-300 w-full sm:w-auto">
              Réserver Maintenant
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <a href="#vehicules" className="w-full sm:w-auto">
            <Button size="xl" variant="luxury" className="px-10 font-bold w-full sm:w-auto border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white">
              Voir les véhicules
            </Button>
          </a>
        </div>
      </div>

      

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10 hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-brand/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-brand rounded-full animate-pulse" />
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
