import { useQuery } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Vehicle } from "@/types/vehicle";

const NOT_CONFIGURED_ERROR = new Error(
  "Supabase non configuré. Vérifiez que le fichier .env existe à la racine du projet avec VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY, puis redémarrez le serveur (arrêtez puis relancez npm run dev)."
);

interface VehicleRow {
  id: number;
  name: string;
  category: string;
  color: string | null;
  year: number | null;
  engine: string | null;
  doors: number | null;
  seats: number;
  price_per_day: number | null;
  price_vente: number | null;
  price_type: "location" | "vente";
  description: string | null;
  fuel: string | null;
  transmission: string | null;
  features: string[] | null;
  main_image_url: string | null;
  is_available: boolean;
}

interface VehicleImageRow {
  vehicle_id: number;
  url: string;
  sort_order: number;
}

function formatPrice(value: number | null): string {
  if (value == null || value === 0) return "Sur demande";
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

function mapRowToVehicle(
  row: VehicleRow,
  imagesByVehicle: Record<number, string[]>
): Vehicle {
  const images = imagesByVehicle[row.id];
  const image =
    row.main_image_url ?? (images && images[0]) ?? "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800";
  const price =
    row.price_type === "location"
      ? formatPrice(row.price_per_day)
      : formatPrice(row.price_vente);
  const features = Array.isArray(row.features) ? row.features : [];

  const allImages = images && images.length > 0 ? images : [image];
  return {
    id: String(row.id),
    image,
    images: allImages,
    name: row.name,
    category: row.category,
    price,
    priceNumeric: row.price_type === "location" ? (row.price_per_day ?? undefined) : (row.price_vente ?? undefined),
    priceType: row.price_type,
    fuel: row.fuel ?? "—",
    seats: row.seats,
    transmission: row.transmission ?? "—",
    description: row.description ?? undefined,
    features: features.length ? features : undefined,
  };
}

export interface UseVehiclesResult {
  location: Vehicle[];
  vente: Vehicle[];
  all: Vehicle[];
  loading: boolean;
  error: Error | null;
}

export function useVehicles(): UseVehiclesResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vehicles"],
    enabled: isSupabaseConfigured,
    queryFn: async () => {
      const [vehiclesRes, imagesRes] = await Promise.all([
        supabase
          .from("vehicles")
          .select("*")
          .eq("is_available", true)
          .order("id", { ascending: true }),
        supabase
          .from("vehicle_images")
          .select("vehicle_id, url, sort_order")
          .order("sort_order", { ascending: true }),
      ]);

      if (vehiclesRes.error) {
        const msg = vehiclesRes.error.message || String(vehiclesRes.error);
        throw new Error(`Supabase (vehicles) : ${msg}`);
      }
      if (imagesRes.error) {
        const msg = imagesRes.error.message || String(imagesRes.error);
        throw new Error(`Supabase (images) : ${msg}`);
      }

      const rows = (vehiclesRes.data ?? []) as VehicleRow[];
      const imageRows = (imagesRes.data ?? []) as VehicleImageRow[];

      const imagesByVehicle: Record<number, string[]> = {};
      for (const img of imageRows) {
        if (!imagesByVehicle[img.vehicle_id]) imagesByVehicle[img.vehicle_id] = [];
        imagesByVehicle[img.vehicle_id].push(img.url);
      }

      const location: Vehicle[] = [];
      const vente: Vehicle[] = [];
      for (const row of rows) {
        const vehicle = mapRowToVehicle(row, imagesByVehicle);
        if (row.price_type === "location") location.push(vehicle);
        else vente.push(vehicle);
      }

      return { location, vente, all: [...location, ...vente] };
    },
  });

  if (!isSupabaseConfigured) {
    return {
      location: [],
      vente: [],
      all: [],
      loading: false,
      error: NOT_CONFIGURED_ERROR,
    };
  }

  return {
    location: data?.location ?? [],
    vente: data?.vente ?? [],
    all: data?.all ?? [],
    loading: isLoading,
    error: error as Error | null,
  };
}
