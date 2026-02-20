import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, CalendarIcon, Car, User, Send, CheckCircle, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useVehicles } from "@/hooks/useVehicles";
import { supabase } from "@/lib/supabase";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "221782271165";
const BLACKKEYS_LOGO =
  "https://res.cloudinary.com/dlna2kuo1/image/upload/v1771340863/IMG_2675-removebg-preview_pg0lgu.png";

const Reservation = () => {
  const [searchParams] = useSearchParams();
  const vehicleId = searchParams.get("vehicule");
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleId || "");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [withDriver, setWithDriver] = useState(false);
  const [reservationRef, setReservationRef] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    licenseNumber: "",
  });

  const { all: allVehicles, loading: vehiclesLoading } = useVehicles();
  const vehicle = allVehicles.find((v) => v.id === selectedVehicle);
  const isVente = vehicle?.priceType === "vente";

  const numberOfDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
  const basePrice = vehicle?.priceNumeric ?? 0;
  const driverFee = withDriver ? 50000 : 0;
  const totalPrice = isVente ? 0 : numberOfDays * (basePrice + driverFee);

  useEffect(() => {
    if (vehicleId) {
      setSelectedVehicle(vehicleId);
    }
  }, [vehicleId]);

  const buildWhatsAppMessage = (refOverride?: string) => {
    if (!vehicle) return "";
    const ref = refOverride ?? reservationRef;
    if (isVente) {
      const lines = [
        "🛻 *Demande d'achat / devis BlackKeys*",
        "",
        "*Véhicule:* " + vehicle.name,
        "*Prix:* " + vehicle.price,
        "",
        "*Client:*",
        "*Nom:* " + formData.firstName + " " + formData.lastName,
        "*Email:* " + formData.email,
        "*Tél:* " + formData.phone,
        formData.address ? "*Adresse:* " + formData.address : "",
        ref ? "*Réf:* " + ref : "",
      ];
      return lines.filter(Boolean).join("\n");
    }
    if (!startDate || !endDate) return "";
    const lines = [
      "🛻 *Nouvelle réservation BlackKeys*",
      "",
      "*Véhicule:* " + vehicle.name,
      "*Du:* " + format(startDate, "dd/MM/yyyy", { locale: fr }),
      "*Au:* " + format(endDate, "dd/MM/yyyy", { locale: fr }),
      "*Durée:* " + numberOfDays + " jour(s)",
      "*Avec chauffeur:* " + (withDriver ? "Oui" : "Non"),
      "",
      "*Client:*",
      "*Nom:* " + formData.firstName + " " + formData.lastName,
      "*Email:* " + formData.email,
      "*Tél:* " + formData.phone,
      formData.address ? "*Adresse:* " + formData.address : "",
      formData.licenseNumber ? "*N° permis:* " + formData.licenseNumber : "",
      "",
      "*Total:* " + totalPrice.toLocaleString("fr-FR") + " FCFA",
      ref ? "*Réf:* " + ref : "",
    ];
    return lines.filter(Boolean).join("\n");
  };

  const openWhatsApp = (refOverride?: string) => {
    const message = buildWhatsAppMessage(refOverride);
    const url = `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ref = "BK-" + Date.now().toString().slice(-8);
    if (!vehicle) return;

    setIsSubmitting(true);
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const { error: insertError } = await supabase.from("reservations").insert({
        reference: ref,
        vehicle_id: parseInt(vehicle.id, 10),
        start_date: isVente ? today : format(startDate!, "yyyy-MM-dd"),
        end_date: isVente ? today : format(endDate!, "yyyy-MM-dd"),
        with_driver: isVente ? false : withDriver,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || null,
        license_number: formData.licenseNumber || null,
        total_price: totalPrice,
        status: "pending",
      });

      if (insertError) {
        toast.error("Erreur lors de l'enregistrement. Vous pouvez quand même continuer sur WhatsApp.");
      } else {
        toast.success("Réservation enregistrée. Elle a été transmise sur WhatsApp.");
      }
    } catch {
      toast.error("Erreur de connexion. Vous pouvez quand même continuer sur WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }

    setReservationRef(ref);
    setStep(4);
    setTimeout(() => openWhatsApp(ref), 500);
  };

  const canProceedToStep2 = isVente
    ? !!selectedVehicle
    : !!(selectedVehicle && startDate && endDate && numberOfDays > 0);
  const canProceedToStep3 = formData.firstName && formData.lastName && formData.email && formData.phone;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/#vehicules"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux véhicules
          </Link>
        </div>

        <div className="container mx-auto px-4 pb-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Réservation
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Complétez le formulaire — votre requête sera transmise sur WhatsApp, sans paiement sur le site
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[
                { num: 1, label: "Véhicule", icon: Car },
                { num: 2, label: "Informations", icon: User },
                { num: 3, label: "Confirmation", icon: Send },
                { num: 4, label: "Confirmation", icon: CheckCircle },
              ].map((s, index) => (
                <div key={s.num} className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all shadow-sm",
                      step >= s.num
                        ? "bg-brand text-white shadow-brand"
                        : "bg-white text-muted-foreground border border-border/50"
                    )}
                  >
                    <s.icon className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">{s.label}</span>
                  </div>
                  {index < 3 && (
                    <div
                      className={cn(
                        "w-8 h-0.5 mx-2",
                        step > s.num ? "bg-brand" : "bg-border"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Vehicle & Dates */}
              {step === 1 && (
                <div className="p-8 rounded-xl bg-white border border-border/50 shadow-lg">
                  <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
                    {isVente ? "Choisissez le véhicule qui vous intéresse" : "Choisissez votre véhicule et vos dates"}
                  </h2>

                  {/* Vehicle Selection */}
                  <div className={isVente ? "mb-8" : "mb-8"}>
                    <label className="text-sm font-medium text-muted-foreground mb-3 block">
                      Véhicule
                    </label>
                    {vehiclesLoading ? (
                      <p className="text-muted-foreground py-4">Chargement des véhicules…</p>
                    ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {allVehicles.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVehicle(v.id)}
                          className={cn(
                            "p-4 rounded-lg border text-left transition-all",
                            selectedVehicle === v.id
                              ? "border-brand bg-brand/10"
                              : "border-border hover:border-brand/50"
                          )}
                        >
                          <div className="flex gap-4">
                            <img
                              src={v.image}
                              alt={v.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-medium text-foreground">{v.name}</h3>
                              <p className="text-sm text-muted-foreground">{v.category}</p>
                              <p className="text-charcoal font-semibold mt-1">
                                {v.price}
                                {v.priceType === "location" ? "/jour" : ""}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    )}
                  </div>

                  {/* Date Selection - masqué pour achat/vente */}
                  {!isVente && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-3 block">
                        Date de début
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="luxury"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP", { locale: fr }) : "Sélectionnez"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-card border-border">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-3 block">
                        Date de fin
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="luxury"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP", { locale: fr }) : "Sélectionnez"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-card border-border">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            disabled={(date) => date < (startDate || new Date())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  )}

                  {/* Driver Option - masqué pour achat/vente */}
                  {!isVente && (
                  <div className="mb-8">
                    <button
                      onClick={() => setWithDriver(!withDriver)}
                      className={cn(
                        "w-full p-4 rounded-lg border text-left transition-all flex items-center justify-between",
                        withDriver
                          ? "border-brand bg-brand/10"
                          : "border-border hover:border-brand/50"
                      )}
                    >
                      <div>
                        <h3 className="font-medium text-foreground">Avec chauffeur</h3>
                        <p className="text-sm text-muted-foreground">
                          Service de chauffeur professionnel inclus
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-charcoal font-semibold">+50 000 FCFA</p>
                        <p className="text-xs text-muted-foreground">par jour</p>
                      </div>
                    </button>
                  </div>
                  )}

                  <Button
                    variant="brand"
                    size="xl"
                    className="w-full"
                    onClick={() => setStep(2)}
                    disabled={!canProceedToStep2}
                  >
                    Continuer
                  </Button>
                </div>
              )}

              {/* Step 2: Personal Info */}
              {step === 2 && (
                <div className="p-8 rounded-xl bg-white border border-border/50 shadow-lg">
                  <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
                    Vos informations
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Prénom *
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-background border-border focus:border-brand"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Nom *
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-background border-border focus:border-brand"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background border-border focus:border-brand"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Téléphone *
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-background border-border focus:border-brand"
                        placeholder="+221 77 XXX XX XX"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Adresse
                      </label>
                      <Input
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="bg-background border-border focus:border-brand"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Numéro de permis de conduire
                      </label>
                      <Input
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        className="bg-background border-border focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="luxury" size="lg" onClick={() => setStep(1)}>
                      Retour
                    </Button>
                    <Button
                      variant="brand"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep(3)}
                      disabled={!canProceedToStep3}
                    >
                      Continuer
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation — aucune paiement sur le site, envoi WhatsApp uniquement */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-white border border-border/50 shadow-lg">
                  <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
                    {isVente ? "Confirmer votre demande de devis" : "Confirmer votre réservation"}
                  </h2>

                  <div className="p-6 rounded-lg bg-background border border-border mb-6">
                    <p className="text-muted-foreground text-center">
                      Votre requête sera transmise à notre équipe sur WhatsApp. <strong>Aucun paiement à effectuer sur le site</strong> — nous vous recontacterons au <span className="text-charcoal font-semibold">+221 78 227 11 65</span> pour la suite.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="luxury" size="lg" onClick={() => setStep(2)}>
                      Retour
                    </Button>
                    <Button type="submit" variant="brand" size="lg" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? "Enregistrement…" : "Envoyer ma requête sur WhatsApp"}
                    </Button>
                  </div>
                </form>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="p-8 rounded-lg bg-charcoal border border-brand text-center">
                  <div className="w-20 h-20 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-brand" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                    {isVente ? "Demande envoyée !" : "Réservation confirmée !"}
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {isVente
                      ? "Merci pour votre demande d'achat. Notre équipe vous recontactera rapidement."
                      : "Merci pour votre demande de réservation. Notre équipe vous recontactera pour la suite (aucun paiement sur le site)."}
                  </p>

                  {/* Message client BlackKeys */}
                  <div className="max-w-md mx-auto mb-8 p-6 rounded-xl bg-white/10 border border-white/20 text-left flex gap-4 items-start">
                    <img
                      src={BLACKKEYS_LOGO}
                      alt="BlackKeys"
                      className="w-14 h-14 object-contain shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-foreground mb-1">BlackKeys</p>
                      <p className="text-foreground/90 text-sm leading-relaxed">
                        Votre requête a été prise en compte. Nous vous revenons dans les plus brefs délais.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-background border border-border mb-6 max-w-sm mx-auto">
                    <p className="text-sm text-muted-foreground">Référence</p>
                    <p className="text-2xl font-mono font-bold text-charcoal">
                      {reservationRef}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Votre requête a été transmise sur WhatsApp au +221 78 227 11 65. Vous pouvez rouvrir le message si besoin.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button
                      variant="brand"
                      size="xl"
                      onClick={() => openWhatsApp()}
                      className="inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Rouvrir le message WhatsApp
                    </Button>
                    <Link to="/">
                      <Button variant="luxury" size="xl">
                        Retour à l'accueil
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Summary Sidebar */}
            {step < 4 && vehicle && (
              <div className="lg:col-span-1">
                <div className="sticky top-28 p-6 rounded-xl bg-white border border-border/50 shadow-lg">
                  <h3 className="text-lg font-serif font-bold text-charcoal mb-4">
                    Récapitulatif
                  </h3>

                  <div className="mb-6">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full aspect-video object-cover rounded-lg mb-4"
                    />
                    <h4 className="font-medium text-foreground">{vehicle.name}</h4>
                    <p className="text-sm text-muted-foreground">{vehicle.category}</p>
                    {isVente && (
                      <p className="text-charcoal font-semibold mt-2">{vehicle.price}</p>
                    )}
                  </div>

                  {!isVente && startDate && endDate && (
                    <>
                      <div className="space-y-3 pb-4 border-b border-border">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Du</span>
                          <span className="text-foreground">
                            {format(startDate, "dd MMM yyyy", { locale: fr })}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Au</span>
                          <span className="text-foreground">
                            {format(endDate, "dd MMM yyyy", { locale: fr })}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Durée</span>
                          <span className="text-foreground">{numberOfDays} jour(s)</span>
                        </div>
                      </div>

                      <div className="space-y-3 py-4 border-b border-border">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Location ({numberOfDays} jour{numberOfDays > 1 ? "s" : ""})
                          </span>
                          <span className="text-foreground">
                            {(numberOfDays * basePrice).toLocaleString()} FCFA
                          </span>
                        </div>
                        {withDriver && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Chauffeur</span>
                            <span className="text-foreground">
                              {(numberOfDays * driverFee).toLocaleString()} FCFA
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between pt-4">
                        <span className="font-medium text-foreground">Total</span>
                        <span className="text-2xl font-serif font-bold text-charcoal">
                          {totalPrice.toLocaleString()} FCFA
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reservation;
