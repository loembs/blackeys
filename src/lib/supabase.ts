import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

/** True si .env contient VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY */
export const isSupabaseConfigured =
  typeof supabaseUrl === "string" &&
  supabaseUrl.length > 0 &&
  typeof supabaseAnonKey === "string" &&
  supabaseAnonKey.length > 0;

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquant. Créez un fichier .env à partir de .env.example"
  );
}

// Client créé uniquement quand configuré ; sinon valeur factice pour éviter l'erreur "supabaseUrl is required"
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient("https://placeholder.supabase.co", "placeholder-key");
