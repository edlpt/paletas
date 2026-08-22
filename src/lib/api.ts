import { supabase } from "@/integrations/supabase/client";

export type Category = {
  id: string;
  slug: string;
  name: string;
  icon_key: string | null;
  sort_order: number;
};

export type Product = {
  id: string;
  category_id: string | null;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  price: number;
  unit: string | null;
  image_key: string | null;
  thc: string | null;
  cbd: string | null;
  stock: number;
  is_featured: boolean;
};

export type CartRow = {
  id: string;
  quantity: number;
  product_id: string;
  products: Product | null;
};

export type OrderRow = {
  id: string;
  order_number: number;
  status: string;
  subtotal: number;
  shipping: number;
  total: number;
  payment_method: string | null;
  delivery_zone: string | null;
  address_text: string | null;
  courier_name: string | null;
  eta_minutes: number | null;
  created_at: string;
};

export async function fetchCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id,slug,name,icon_key,sort_order")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function fetchProducts(opts: { category?: string; search?: string } = {}) {
  let q = supabase.from("products").select("*").eq("is_active", true);
  if (opts.category) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", opts.category)
      .maybeSingle();
    if (cat?.id) q = q.eq("category_id", cat.id);
  }
  if (opts.search) q = q.ilike("name", `%${opts.search}%`);
  const { data, error } = await q.order("is_featured", { ascending: false }).order("name");
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchProduct(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as Product | null;
}

export async function fetchBanners() {
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function fetchZones() {
  const { data, error } = await supabase
    .from("delivery_zones")
    .select("*")
    .order("fee");
  if (error) throw error;
  return data ?? [];
}

export async function fetchCart() {
  const { data, error } = await supabase
    .from("cart_items")
    .select("id,quantity,product_id,products(*)")
    .order("created_at");
  if (error) throw error;
  return (data ?? []) as unknown as CartRow[];
}

export async function addToCart(userId: string, productId: string, quantity = 1) {
  const { data: existing } = await supabase
    .from("cart_items")
    .select("id,quantity")
    .eq("product_id", productId)
    .maybeSingle();
  if (existing) {
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id);
    if (error) throw error;
    return;
  }
  const { error } = await supabase
    .from("cart_items")
    .insert({ user_id: userId, product_id: productId, quantity });
  if (error) throw error;
}

export async function setCartQuantity(id: string, quantity: number) {
  if (quantity <= 0) {
    const { error } = await supabase.from("cart_items").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", id);
  if (error) throw error;
}

export async function removeCartItem(id: string) {
  const { error } = await supabase.from("cart_items").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchFavorites() {
  const { data, error } = await supabase
    .from("favorites")
    .select("id,product_id,products(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as { id: string; product_id: string; products: Product | null }[];
}

export async function toggleFavorite(userId: string, productId: string, isFav: boolean) {
  if (isFav) {
    const { error } = await supabase.from("favorites").delete().eq("product_id", productId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("favorites")
      .insert({ user_id: userId, product_id: productId });
    if (error) throw error;
  }
}

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as OrderRow[];
}

export async function fetchOrder(id: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as (OrderRow & { order_items: OrderItem[] }) | null;
}

export type OrderItem = {
  id: string;
  name: string;
  image_key: string | null;
  unit_price: number;
  quantity: number;
};

export async function fetchNotifications() {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createOrder(params: {
  userId: string;
  items: CartRow[];
  subtotal: number;
  shipping: number;
  paymentMethod: string;
  zone: string;
  address: string;
}) {
  const total = params.subtotal + params.shipping;
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      user_id: params.userId,
      subtotal: params.subtotal,
      shipping: params.shipping,
      total,
      payment_method: params.paymentMethod,
      delivery_zone: params.zone,
      address_text: params.address,
      status: "confirmed",
      courier_name: "Juan Esteban",
      eta_minutes: 25,
    })
    .select()
    .single();
  if (error) throw error;

  const items = params.items.map((i) => ({
    order_id: order.id,
    product_id: i.product_id,
    name: i.products?.name ?? "Producto",
    image_key: i.products?.image_key ?? null,
    unit_price: Number(i.products?.price ?? 0),
    quantity: i.quantity,
  }));
  const { error: itemsError } = await supabase.from("order_items").insert(items);
  if (itemsError) throw itemsError;

  await supabase.from("cart_items").delete().eq("user_id", params.userId);
  await supabase.from("notifications").insert({
    user_id: params.userId,
    title: "Tu pedido fue confirmado",
    body: `Pedido #${order.order_number} está en preparación.`,
  });

  return order as OrderRow;
}
