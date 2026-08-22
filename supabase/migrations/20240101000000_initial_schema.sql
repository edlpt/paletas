-- 0001_initial_schema.sql
-- Create initial tables for El De Las Paletas

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  avatar_url text,
  full_name text,
  phone text,
  city text,
  role text default 'customer' check (role in ('customer', 'staff', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: categories
create table if not exists public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  icon_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: products
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.categories on delete set null,
  name text not null,
  description text,
  price numeric not null check (price >= 0),
  thc_percentage numeric,
  cbd_percentage numeric,
  weight_g numeric,
  is_available boolean default true,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: cart_items
create table if not exists public.cart_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  product_id uuid references public.products on delete cascade not null,
  quantity integer not null check (quantity > 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- Table: orders
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'preparing', 'ready', 'in_transit', 'delivered', 'cancelled')),
  total numeric not null check (total >= 0),
  delivery_address text,
  delivery_method text,
  payment_method text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: order_items
create table if not exists public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders on delete cascade not null,
  product_id uuid references public.products on delete set null,
  quantity integer not null check (quantity > 0),
  price_at_time numeric not null check (price_at_time >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: favorites
create table if not exists public.favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  product_id uuid references public.products on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.favorites enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Policies for categories
create policy "Categories are viewable by everyone." on public.categories for select using (true);

-- Policies for products
create policy "Products are viewable by everyone." on public.products for select using (true);

-- Policies for cart_items
create policy "Users can view own cart." on public.cart_items for select using (auth.uid() = user_id);
create policy "Users can insert own cart items." on public.cart_items for insert with check (auth.uid() = user_id);
create policy "Users can update own cart items." on public.cart_items for update using (auth.uid() = user_id);
create policy "Users can delete own cart items." on public.cart_items for delete using (auth.uid() = user_id);

-- Policies for favorites
create policy "Users can view own favorites." on public.favorites for select using (auth.uid() = user_id);
create policy "Users can insert own favorites." on public.favorites for insert with check (auth.uid() = user_id);
create policy "Users can delete own favorites." on public.favorites for delete using (auth.uid() = user_id);

-- Policies for orders
create policy "Users can view own orders." on public.orders for select using (auth.uid() = user_id);
create policy "Users can create own orders." on public.orders for insert with check (auth.uid() = user_id);

-- Policies for order_items
create policy "Users can view own order items." on public.order_items for select using (
  exists (
    select 1 from public.orders
    where orders.id = order_items.order_id and orders.user_id = auth.uid()
  )
);
create policy "Users can insert own order items." on public.order_items for insert with check (
  exists (
    select 1 from public.orders
    where orders.id = order_items.order_id and orders.user_id = auth.uid()
  )
);

-- Function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'customer');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on sign up
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
