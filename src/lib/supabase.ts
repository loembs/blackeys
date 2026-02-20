import { createClient } from "@supabase/supabase-js";

function getEnv(key: string): string {
  const v = import.meta.env[key] ?? (import.meta.env as Record<string, unknown>)[key];
  return (typeof v === "string" ? v : "").trim();
}

// Valeurs lues depuis .env (ou fallback en dev si la plateforme ne charge pas le .env)
const fromEnvUrl = getEnv("VITE_SUPABASE_URL");
const fromEnvKey = getEnv("VITE_SUPABASE_ANON_KEY");

// Fallback en développement uniquement : si .env n'est pas chargé (ex. Lovable, build distant), on utilise ces valeurs
const DEV_FALLBACK_URL = "https://dbwdunlchnblumwnmmev.supabase.co";
const DEV_FALLBACK_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRid2R1bmxjaG5ibHVtd25tbWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1ODc2MjgsImV4cCI6MjA4NzE2MzYyOH0.c4xZWKFsvanxRcq_b6OdI9zYqw5GWpjXe_YkcLtImjU";

const supabaseUrl = fromEnvUrl || (import.meta.env.DEV ? DEV_FALLBACK_URL : "");
const supabaseAnonKey = fromEnvKey || (import.meta.env.DEV ? DEV_FALLBACK_ANON_KEY : "");

/** True si on a une URL et une clé Supabase (env ou fallback dev) */
export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase: aucune configuration. Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env ou dans les variables d'environnement de votre hébergeur."
  );
}

// Client créé uniquement quand configuré ; sinon valeur factice pour éviter l'erreur "supabaseUrl is required"
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient("https://placeholder.supabase.co", "placeholder-key");
