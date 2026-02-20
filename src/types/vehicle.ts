/** Véhicule tel qu’affiché dans l’app (issu de Supabase ou statique) */
export interface Vehicle {
  id: string;
  image: string;
  name: string;
  category: string;
  price: string;
  /** Prix par jour (location) ou prix de vente, pour les calculs */
  priceNumeric?: number;
  priceType: "location" | "vente";
  fuel: string;
  seats: number;
  transmission: string;
  description?: string;
  features?: string[];
}
