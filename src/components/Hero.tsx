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
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dlna2kuo1/video/upload/q_auto,f_auto/v1771266167/WhatsApp_Video_2026-02-16_at_18.18.31_p0pns3.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-center justify-center h-full pt-20 pb-12">
        <div className="text-center max-w-4xl">
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/reservation">
              <Button size="xl" className="group bg-charcoal hover:bg-black text-white font-bold px-10">
                Réserver Maintenant
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Bar integrated into Hero */}
        <FilterBar />
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
