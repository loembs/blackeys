import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

const isConfigured = supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

if (!isConfigured) {
  console.warn(
    "Supabase: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquant. Créez un fichier .env à partir de .env.example"
  );
}

// Valeurs factices pour éviter l'erreur "supabaseUrl is required" ; les requêtes échoueront tant que .env n'est pas configuré
export const supabase = createClient(
  isConfigured ? supabaseUrl : "https://placeholder.supabase.co",
  isConfigured ? supabaseAnonKey : "placeholder-key"
);
