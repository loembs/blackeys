import { ArrowRight, MapPin, Car, Plane } from "lucide-react";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard = ({ image, title, description, features }: ServiceCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white border border-border/50 shadow-sm hover:shadow-xl hover:border-brand/30 transition-all duration-500">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />

        {/* Journey Illustration for Airport Shuttle */}
        {title === "Navette Aéroport AIBD" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-4/5 h-20 flex items-center justify-between px-4">
              <div className="absolute left-0 right-0 h-0.5 border-t-2 border-dashed border-white/60 top-1/2 -translate-y-1/2" />
              <div className="z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full border border-white/30 animate-pulse">
                <MapPin className="w-5 h-5 text-white" />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white font-bold uppercase tracking-tighter whitespace-nowrap">Dakar</span>
              </div>
              <div className="z-10 absolute left-[15%] top-1/2 animate-[move-car_8s_linear_infinite]">
                <div className="bg-brand p-2 rounded-lg shadow-lg rotate-0">
                  <Car className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="z-10 bg-brand/20 backdrop-blur-md p-2 rounded-full border border-brand/50">
                <Plane className="w-5 h-5 text-brand" />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-brand font-bold uppercase tracking-tighter whitespace-nowrap">AIBD</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative p-8">
        <h3 className="text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-brand transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-brand rounded-full" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-brand font-medium hover:gap-3 transition-all duration-300"
        >
          En savoir plus
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
