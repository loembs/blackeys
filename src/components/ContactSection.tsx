import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé avec succès! Nous vous contacterons bientôt.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      value: "Dakar, Sénégal",
      subvalue: "Almadies, Route de Ngor",
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+221 77 000 00 00",
      subvalue: "+221 33 800 00 00",
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact@blackkeys.sn",
      subvalue: "reservation@blackkeys.sn",
    },
    {
      icon: Clock,
      title: "Horaires",
      value: "Lun - Sam: 8h - 20h",
      subvalue: "Dimanche: Sur RDV",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand font-medium tracking-[0.3em] uppercase text-sm">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6">
            Parlons de Votre Projet
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Que ce soit pour une réservation, un achat ou simplement pour obtenir
            plus d'informations, notre équipe est à votre disposition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-white border border-border/50 shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    {info.title}
                  </h3>
                  <p className="text-charcoal font-semibold">{info.value}</p>
                  <p className="text-sm text-muted-foreground">{info.subvalue}</p>
                </div>
              ))}
            </div>

            {/* Google Maps Integration */}
            <div className="h-64 rounded-xl overflow-hidden border border-border/50 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123488.80135128715!2d-17.548228342492273!3d14.711175941235355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172f5b3c5bb71%3A0xb17c17d92d5db21f!2sDakar!5e0!3m2!1sfr!2ssn!4v1771269930781!5m2!1sfr!2ssn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-xl bg-white border border-border/50 shadow-lg">
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">
              Demande de Réservation
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Nom Complet
                  </label>
                  <Input
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border-border focus:border-brand"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border-border focus:border-brand"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Téléphone
                  </label>
                  <Input
                    placeholder="+221 77 XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background border-border focus:border-brand"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground focus:border-brand focus:outline-none"
                    required
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="location">Location de véhicule</option>
                    <option value="vente">Achat de véhicule</option>
                    <option value="chauffeur">Location avec chauffeur</option>
                    <option value="navette">Navette Aéroport AIBD</option>
                    <option value="excursion">Excursion au Sénégal</option>
                    <option value="decoration">Décoration événementielle</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Message
                </label>
                <Textarea
                  placeholder="Décrivez votre projet..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background border-border focus:border-brand min-h-32"
                  required
                />
              </div>

              <Button type="submit" variant="brand" size="xl" className="w-full group">
                Envoyer la Demande
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
