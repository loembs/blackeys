import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convertit une chaîne en slug URL-friendly
 * Exemple: "Mercedes-Benz Classe S" → "mercedes-benz-classe-s"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')                    // Décompose les caractères accentués
    .replace(/[̀-ͯ]/g, '')     // Supprime les diacritiques
    .replace(/[ùûü]/g, 'u')              // Cas particuliers pour les accents
    .replace(/[éèêë]/g, 'e')
    .replace(/[âàä]/g, 'a')
    .replace(/[ôö]/g, 'o')
    .replace(/[îï]/g, 'i')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')         // Remplace les caractères non-alphanumériques par des tirets
    .replace(/^-+|-+$/g, '');             // Supprime les tirets au début et à la fin
}
