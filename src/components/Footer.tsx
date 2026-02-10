import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/#accueil", label: "Accueil" },
    { href: "/#vehicules", label: "Véhicules" },
    { href: "/#services", label: "Services" },
    { href: "/#apropos", label: "À Propos" },
    { href: "/#contact", label: "Contact" },
  ];

  const services = [
    "Location de véhicules",
    "Vente automobile",
    "Location avec chauffeur",
    "Navette Aéroport AIBD",
    "Excursions au Sénégal",
    "Décoration événementielle",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/blackey_location_vente/", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-obsidian border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-serif font-bold text-foreground">
                BLACK
              </span>
              <span className="text-2xl font-serif font-bold text-gradient-brand">
                KEYS
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Votre partenaire de confiance pour la location et la vente de
              véhicules de luxe au Sénégal depuis plus de 10 ans.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-charcoal border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold text-foreground mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-brand transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif font-bold text-foreground mb-6">
              Nos Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-bold text-foreground mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Almadies, Route de Ngor
                  <br />
                  Dakar, Sénégal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand shrink-0" />
                <span className="text-muted-foreground text-sm">+221 77 000 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand shrink-0" />
                <span className="text-muted-foreground text-sm">contact@blackkeys.sn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} BLACKKEYS. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-brand transition-colors">
              Conditions Générales
            </a>
            <a href="#" className="hover:text-brand transition-colors">
              Politique de Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
