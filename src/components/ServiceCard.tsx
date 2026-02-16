import { ArrowRight } from "lucide-react";

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
