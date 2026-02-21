import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#accueil", label: "Accueil" },
    { href: "/#vehicules", label: "Véhicules" },
    { href: "/#services", label: "Services" },
    { href: "/#apropos", label: "À Propos" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1771340863/IMG_2675-removebg-preview_pg0lgu.png"
              alt="BLACKEYS"
              className="h-14 w-auto object-contain"
            />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-brand transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{CONTACT.phoneDisplay}</span>
            </a>
            <Link to="/reservation">
              <Button variant="brand" size="sm">
                Réserver
              </Button>
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-muted-foreground hover:text-brand transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border/50">
                <Link to="/reservation" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="brand" className="w-full">
                    Réserver
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
export default Header;
