import { createClient } from "@supabase/supabase-js";

function getEnv(key: string): string {
  const v = import.meta.env[key];
  return (typeof v === "string" ? v : "").trim();
}

const supabaseUrl = getEnv("VITE_SUPABASE_URL");
const supabaseAnonKey = getEnv("VITE_SUPABASE_ANON_KEY");

/** True si .env contient VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY */
export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquant. Créez un fichier .env à partir de .env.example"
  );
}

// Client créé uniquement quand configuré ; sinon valeur factice pour éviter l'erreur "supabaseUrl is required"
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient("https://placeholder.supabase.co", "placeholder-key");
