import { createClient } from "@supabase/supabase-js";

function getEnv(key: string): string {
  const v = import.meta.env[key] ?? (import.meta.env as Record<string, unknown>)[key];
  return (typeof v === "string" ? v : "").trim();
}

// Valeurs lues depuis .env (ou fallback en dev si la plateforme ne charge pas le .env)
const fromEnvUrl = getEnv("VITE_SUPABASE_URL");
const fromEnvKey = getEnv("VITE_SUPABASE_ANON_KEY");

// Fallback si .env n'est pas chargé (ex. build distant, preview, Lovable) — remplace par ton projet Supabase si différent
const FALLBACK_URL = "https://dbwdunlchnblumwnmmev.supabase.co";
const FALLBACK_ANON_KEY = "";

const supabaseUrl = fromEnvUrl || FALLBACK_URL;
const supabaseAnonKey = fromEnvKey || FALLBACK_ANON_KEY;

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
