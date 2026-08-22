
-- roles
CREATE TYPE public.app_role AS ENUM ('customer','staff','admin');
CREATE TYPE public.order_status AS ENUM ('pending','confirmed','preparing','ready','in_transit','delivered','cancelled');

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text, last_name text, email text, phone text,
  birth_date date, city text DEFAULT 'Medellín', address text, avatar_url text,
  age_verified boolean NOT NULL DEFAULT false,
  preferences jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles read" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('staff','admin'))
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'first_name', NEW.raw_user_meta_data->>'last_name')
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer') ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  icon_key text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories public read" ON public.categories FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "categories staff write" ON public.categories FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  subtitle text,
  description text,
  price numeric(12,2) NOT NULL DEFAULT 0,
  unit text DEFAULT '1g',
  image_key text,
  image_url text,
  thc text, cbd text,
  stock int NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX products_category_idx ON public.products(category_id);
CREATE INDEX products_featured_idx ON public.products(is_featured);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products public read" ON public.products FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "products staff write" ON public.products FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER products_updated BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);
GRANT SELECT, INSERT, DELETE ON public.favorites TO authenticated;
GRANT ALL ON public.favorites TO service_role;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own favorites" ON public.favorites FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity int NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cart_items TO authenticated;
GRANT ALL ON public.cart_items TO service_role;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own cart" ON public.cart_items FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER cart_updated BEFORE UPDATE ON public.cart_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label text, line1 text NOT NULL, line2 text,
  neighborhood text, city text NOT NULL DEFAULT 'Medellín',
  notes text, is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.addresses TO authenticated;
GRANT ALL ON public.addresses TO service_role;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own addresses" ON public.addresses FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.delivery_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, city text NOT NULL DEFAULT 'Medellín',
  fee numeric(12,2) NOT NULL DEFAULT 0,
  eta_minutes int NOT NULL DEFAULT 30,
  is_active boolean NOT NULL DEFAULT true
);
GRANT SELECT ON public.delivery_zones TO anon, authenticated;
GRANT ALL ON public.delivery_zones TO service_role;
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "zones public read" ON public.delivery_zones FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "zones staff write" ON public.delivery_zones FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE SEQUENCE public.order_number_seq START 42069;
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number int NOT NULL DEFAULT nextval('public.order_number_seq'),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status public.order_status NOT NULL DEFAULT 'pending',
  subtotal numeric(12,2) NOT NULL DEFAULT 0,
  shipping numeric(12,2) NOT NULL DEFAULT 0,
  total numeric(12,2) NOT NULL DEFAULT 0,
  payment_method text,
  delivery_zone text,
  address_text text,
  courier_name text,
  eta_minutes int,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX orders_user_idx ON public.orders(user_id);
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own orders read" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.is_staff(auth.uid()));
CREATE POLICY "own orders insert" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "orders staff update" ON public.orders FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER orders_updated BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  name text NOT NULL, image_key text,
  unit_price numeric(12,2) NOT NULL,
  quantity int NOT NULL DEFAULT 1
);
CREATE INDEX order_items_order_idx ON public.order_items(order_id);
GRANT SELECT, INSERT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own order items read" ON public.order_items FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.is_staff(auth.uid()))));
CREATE POLICY "own order items insert" ON public.order_items FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));

CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL, body text, is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own notifications" ON public.notifications FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, subtitle text, image_key text,
  sort_order int NOT NULL DEFAULT 0, is_active boolean NOT NULL DEFAULT true
);
GRANT SELECT ON public.banners TO anon, authenticated;
GRANT ALL ON public.banners TO service_role;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "banners public read" ON public.banners FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "banners staff write" ON public.banners FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE TABLE public.app_settings (
  key text PRIMARY KEY, value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.app_settings TO anon, authenticated;
GRANT ALL ON public.app_settings TO service_role;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings public read" ON public.app_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "settings staff write" ON public.app_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- seed
INSERT INTO public.categories (slug, name, icon_key, sort_order) VALUES
 ('flores','Flores','flores',1),
 ('pre-rolls','Pre-rolls','prerolls',2),
 ('concentrados','Concentrados','concentrados',3),
 ('edibles','Edibles','edibles',4),
 ('accesorios','Accesorios','accesorios',5);

INSERT INTO public.products (category_id, slug, name, subtitle, description, price, unit, image_key, thc, cbd, stock, is_featured)
SELECT c.id, 'lemon-haze','Lemon Haze','Flor Sativa','Aroma cítrico, notas frescas y perfil aromático vibrante.',60000,'1g','flores','22%','2%',40,true FROM public.categories c WHERE c.slug='flores';
INSERT INTO public.products (category_id, slug, name, subtitle, description, price, unit, image_key, thc, cbd, stock, is_featured)
SELECT c.id, 'purple-punch','Purple Punch','Flor Indica','Perfil dulce con notas de uva y frutos rojos.',55000,'1g','flores','20%','1%',25,false FROM public.categories c WHERE c.slug='flores';
INSERT INTO public.products (category_id, slug, name, subtitle, description, price, unit, image_key, thc, cbd, stock, is_featured)
SELECT c.id, 'galletas-cosmicas','Galletas Cósmicas','100mg THC','Galletas artesanales de edición limitada.',45000,'1 und','edibles','15%','1%',30,true FROM public.categories c WHERE c.slug='edibles';
INSERT INTO public.products (category_id, slug, name, subtitle, description, price, unit, image_key, thc, cbd, stock, is_featured)
SELECT c.id, 'pre-rolls-cosmicos','Pre-rolls Cósmicos','2 unidades','Pre-rolls listos, liado artesanal.',20000,'2 und','prerolls','18%','1%',60,true FROM public.categories c WHERE c.slug='pre-rolls';
INSERT INTO public.products (category_id, slug, name, subtitle, description, price, unit, image_key, thc, cbd, stock, is_featured)
SELECT c.id, 'concentrado-slime','Concentrado Slime','Extracto premium','Extracto de alta pureza, textura dorada.',90000,'1g','concentrados','70%','2%',12,false FROM public.categories c WHERE c.slug='concentrados';
INSERT INTO public.products (category_id, slug, name, subtitle, description, price, unit, image_key, thc, cbd, stock, is_featured)
SELECT c.id, 'bong-alien','Bong Alien','Vidrio artesanal','Pieza de vidrio pintada a mano, edición alien.',180000,'1 und','accesorios',NULL,NULL,8,false FROM public.categories c WHERE c.slug='accesorios';

INSERT INTO public.banners (title, subtitle, image_key, sort_order) VALUES
 ('Envíos rápidos','en Medellín','rocket',1),
 ('Explora nuevas experiencias','Catálogo cósmico','alien',2);

INSERT INTO public.delivery_zones (name, fee, eta_minutes) VALUES
 ('El Poblado',0,25),('Laureles',6000,30),('Envigado',8000,40),('Sabaneta',9000,45),('Belén',7000,35),('Centro',7000,35);

INSERT INTO public.app_settings (key, value) VALUES
 ('eligibility','{"min_age":18,"requires_age_gate":true}'::jsonb),
 ('payment_methods','{"card":true,"transfer":true,"cash_on_delivery":true}'::jsonb);
