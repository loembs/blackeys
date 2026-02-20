-- ============================================================
-- Luxe Drive Booking - Schéma Supabase
-- Exécuter ce fichier dans l'éditeur SQL de votre projet Supabase
-- ============================================================

-- Extension pour générer des UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------
-- Table: vehicles (véhicules) — id auto-incrémenté
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.vehicles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  color TEXT,
  year INTEGER,
  engine TEXT,
  doors INTEGER DEFAULT 4,
  seats INTEGER NOT NULL,
  price_per_day INTEGER,
  price_vente INTEGER,
  price_type TEXT NOT NULL CHECK (price_type IN ('location', 'vente')),
  description TEXT,
  fuel TEXT,
  transmission TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  main_image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Table: vehicle_images (image principale + images annexes)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.vehicle_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id INTEGER NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vehicle_id, sort_order)
);

CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle_id ON public.vehicle_images(vehicle_id);

-- ------------------------------------------------------------
-- Table: reservations
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference TEXT UNIQUE,
  vehicle_id INTEGER NOT NULL REFERENCES public.vehicles(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  with_driver BOOLEAN DEFAULT false,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  license_number TEXT,
  total_price INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reservations_vehicle_id ON public.reservations(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_reservations_dates ON public.reservations(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_reservations_reference ON public.reservations(reference);

-- ------------------------------------------------------------
-- Trigger: updated_at sur vehicles et reservations
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS vehicles_updated_at ON public.vehicles;
CREATE TRIGGER vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS reservations_updated_at ON public.reservations;
CREATE TRIGGER reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ------------------------------------------------------------
-- TARIFS : Les montants ci-dessous sont des prix de LOCATION (par jour).
-- Pour l'achat (vente), seules les fiches véhicules sont prévues ;
-- les prix d'achat (price_vente) seront renseignés lorsqu'ils seront disponibles.
-- ------------------------------------------------------------

-- Données de démonstration : Range Rover Velar (id = 1 par auto-incrément)
-- (Remplacez les URLs d'images par vos URLs Supabase Storage)

-- Image principale (déjà dans main_image_url, répétée ici pour vehicle_images)
-- vehicle_id = 1 correspond au Range Rover Velar inséré ci-dessus

-- ------------------------------------------------------------
-- Véhicules supplémentaires (tarifs = location / jour ; achat = prix à venir)
-- ------------------------------------------------------------
INSERT INTO public.vehicle_images (vehicle_id, url, sort_order)
SELECT id, url, sort_order FROM (
  VALUES
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771585030/Range_Rover_brown_1_loa1c9.jpg', 0),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771585030/Range_Rover_brown_2_whvszx.jpg', 1),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771585027/Range_Rover_brown_3_wl9zax.jpg', 2)
) AS imgs(url, sort_order)
JOIN public.vehicles v ON v.name = 'Range Rover Velar'
ON CONFLICT (vehicle_id, sort_order) DO NOTHING;

INSERT INTO public.vehicle_images (vehicle_id, url, sort_order)
SELECT id, url, sort_order FROM (
  VALUES
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771585896/Kia_k5_1_hpsdeb.jpg', 0),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771585896/Kia_k5_2_g1rlby.jpg', 1),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771585896/Kia_k5_4_n9c3or.jpg', 2),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771585895/Kia_k5_6_wa4iek.jpg', 3),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771585895/Kia_k5_7_xjexwi.jpg', 4)
) AS imgs(url, sort_order)
JOIN public.vehicles v ON v.name = 'Kia K5'
ON CONFLICT (vehicle_id, sort_order) DO NOTHING;

INSERT INTO public.vehicle_images (vehicle_id, url, sort_order)
SELECT id, url, sort_order FROM (
  VALUES
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771586740/Renault_grey_1_atf7jl.jpg', 0),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771586740/Renault_grey_2_t0u6p5.jpg', 1),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771586740/Renault_grey_3_f6i92v.jpg', 2),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771586740/Renault_grey_5_jl9n4h.jpg', 3),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771586740/Renault_grey_4_zdaczh.jpg', 4),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771586739/Renault_grey_6_s7gppp.jpg', 5)
) AS imgs(url, sort_order)
JOIN public.vehicles v ON v.name = 'Renault SM3'
ON CONFLICT (vehicle_id, sort_order) DO NOTHING;

INSERT INTO public.vehicle_images (vehicle_id, url, sort_order)
SELECT id, url, sort_order FROM (
  VALUES
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771587321/Peugeot208_1_vgl6d5.jpg', 0),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771587320/Peugeot208_3_z3wlzs.jpg', 1),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771587320/Peugeot208_2_tafkiq.jpg', 2),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771587320/Peugeot208_4_tszqxl.jpg', 3),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771587320/Peugeot208_5_prr5kv.jpg', 4),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771587320/Peugeot208_6_vdyo8l.jpg', 5)
) AS imgs(url, sort_order)
JOIN public.vehicles v ON v.name = 'Peugeot 208'
ON CONFLICT (vehicle_id, sort_order) DO NOTHING;


INSERT INTO public.vehicle_images (vehicle_id, url, sort_order)
SELECT id, url, sort_order FROM (
  VALUES
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771587773/FordF150_1_y3wjbq.jpg', 0),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771587772/FordF150_2_f57bzw.jpg', 1),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771587773/FordF150_3_cqaoez.jpg', 2),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771587772/FordF150_4_vdui7c.jpg', 3),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771587772/FordF150_5_jpaz9a.jpg', 4)
) AS imgs(url, sort_order)
JOIN public.vehicles v ON v.name = 'Ford F150'
ON CONFLICT (vehicle_id, sort_order) DO NOTHING;


INSERT INTO public.vehicle_images (vehicle_id, url, sort_order)
SELECT id, url, sort_order FROM (
  VALUES
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771588367/Mitsubishi_1_z9wh2y.jpg', 0),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771588363/Mitsubishi_2_b9jglr.jpg', 1),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771588363/Mitsubishi_3_vizshy.jpg', 2),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771588362/Mitsubishi_5_bflbqv.jpg', 3),
  ('https://res.cloudinary.com/dprbhsvxl/image/upload/v1771588362/Mitsubishi_4_lykyjh.jpg', 4)
) AS imgs(url, sort_order)
JOIN public.vehicles v ON v.name = 'Mitsubishi Outlander'
ON CONFLICT (vehicle_id, sort_order) DO NOTHING;


-- ------------------------------------------------------------
-- RLS (Row Level Security) - optionnel, à activer si besoin
-- ------------------------------------------------------------
-- ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.vehicle_images ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Politique lecture publique des véhicules (pour le site)
-- CREATE POLICY "Véhicules visibles par tous" ON public.vehicles FOR SELECT USING (true);
-- CREATE POLICY "Images visibles par tous" ON public.vehicle_images FOR SELECT USING (true);

-- Politique réservations : lecture/écriture selon votre auth
-- CREATE POLICY "Créer réservation" ON public.reservations FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Lire ses réservations" ON public.reservations FOR SELECT USING (true);
