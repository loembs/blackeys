/** Coordonnées BlackKeys — utilisées partout sur le site */
export const CONTACT = {
  email: "blackey221.sn@gmail.com",
  phone: "782271165",
  phoneDisplay: "+221 78 227 11 65",
  phoneTel: "+221782271165",
  whatsapp: "221782271165",
} as const;

/** Extrait la marque du nom du véhicule pour les filtres */
export function getBrandFromName(name: string): string {
  if (!name) return "";
  if (name.startsWith("Range Rover")) return "Range Rover";
  if (name.startsWith("Hyundai")) return "Hyundai";
  if (name.startsWith("Mercedes")) return "Mercedes";
  if (name.startsWith("Land Rover")) return "Land Rover";
  return name.split(" ")[0] ?? "";
}

/** Filtre et trie une liste de véhicules */
export function filterAndSortVehicles<T extends { name: string; category: string; priceNumeric?: number }>(
  list: T[],
  brand: string,
  category: string,
  sortOrder: "asc" | "desc" | ""
): T[] {
  let out = list;
  if (brand) {
    out = out.filter((v) => getBrandFromName(v.name) === brand);
  }
  if (category) {
    out = out.filter((v) => v.category === category);
  }
  if (sortOrder === "asc" || sortOrder === "desc") {
    out = [...out].sort((a, b) => {
      const pa = a.priceNumeric ?? 0;
      const pb = b.priceNumeric ?? 0;
      return sortOrder === "asc" ? pa - pb : pb - pa;
    });
  }
  return out;
}
