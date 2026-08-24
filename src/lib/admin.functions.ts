import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const tokenSchema = z.object({ token: z.string().uuid() });

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ pin: z.string().min(3).max(20) }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: setting } = await supabaseAdmin
      .from("store_settings")
      .select("value")
      .eq("key", "admin_pin")
      .maybeSingle();

    if (!setting || setting.value !== data.pin) {
      await new Promise((r) => setTimeout(r, 600));
      return { ok: false as const };
    }

    await supabaseAdmin.from("admin_sessions").delete().lt("expires_at", new Date().toISOString());
    const { data: session, error } = await supabaseAdmin
      .from("admin_sessions")
      .insert({})
      .select("token")
      .single();
    if (error) throw new Error("Could not start admin session");
    return { ok: true as const, token: session.token as string };
  });

async function requireAdmin(token: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("admin_sessions")
    .select("token, expires_at")
    .eq("token", token)
    .maybeSingle();
  if (!data || new Date(data.expires_at as string) < new Date()) {
    throw new Error("Unauthorized");
  }
  return supabaseAdmin;
}

export const adminLogout = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => tokenSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("admin_sessions").delete().eq("token", data.token);
    return { ok: true };
  });

export const adminDashboard = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => tokenSchema.parse(data))
  .handler(async ({ data }) => {
    const db = await requireAdmin(data.token);
    const [orders, cakes, products] = await Promise.all([
      db.from("orders").select("*").order("created_at", { ascending: false }).limit(200),
      db.from("cake_requests").select("*").order("created_at", { ascending: false }).limit(200),
      db.from("products").select("*").order("sort_order", { ascending: true }),
    ]);
    return {
      orders: orders.data ?? [],
      cakeRequests: cakes.data ?? [],
      products: products.data ?? [],
    };
  });

export const adminSetOrderStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        token: z.string().uuid(),
        id: z.string().uuid(),
        status: z.enum(["new", "preparing", "ready", "delivered", "cancelled"]),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const db = await requireAdmin(data.token);
    const { error } = await db.from("orders").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error("Update failed");
    return { ok: true };
  });

export const adminSetCakeStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        token: z.string().uuid(),
        id: z.string().uuid(),
        status: z.enum(["new", "preparing", "ready", "delivered", "cancelled"]),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const db = await requireAdmin(data.token);
    const { error } = await db
      .from("cake_requests")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error("Update failed");
    return { ok: true };
  });

const productSchema = z.object({
  token: z.string().uuid(),
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/),
  category: z.enum(["baklava", "syrup", "cakes"]),
  name_nl: z.string().trim().min(1).max(160),
  name_ar: z.string().trim().min(1).max(160),
  name_en: z.string().trim().min(1).max(160),
  desc_nl: z.string().max(1000).default(""),
  desc_ar: z.string().max(1000).default(""),
  desc_en: z.string().max(1000).default(""),
  price: z.number().min(0).max(100000),
  unit: z.enum(["kg", "piece", "box", "cake"]),
  image_url: z.string().max(500).optional().or(z.literal("")),
  featured: z.boolean(),
  available: z.boolean(),
  sort_order: z.number().int().min(0).max(9999),
});

export const adminSaveProduct = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => productSchema.parse(data))
  .handler(async ({ data }) => {
    const db = await requireAdmin(data.token);
    const { token: _t, id, image_url, ...rest } = data;
    const payload = { ...rest, image_url: image_url || null };
    const { error } = id
      ? await db.from("products").update(payload).eq("id", id)
      : await db.from("products").insert(payload);
    if (error) {
      console.error("adminSaveProduct failed", error.message);
      throw new Error("Could not save product");
    }
    return { ok: true };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ token: z.string().uuid(), id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data }) => {
    const db = await requireAdmin(data.token);
    const { error } = await db.from("products").delete().eq("id", data.id);
    if (error) throw new Error("Could not delete product");
    return { ok: true };
  });

export const adminChangePin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ token: z.string().uuid(), pin: z.string().trim().min(4).max(12) }).parse(data),
  )
  .handler(async ({ data }) => {
    const db = await requireAdmin(data.token);
    const { error } = await db
      .from("store_settings")
      .update({ value: data.pin, updated_at: new Date().toISOString() })
      .eq("key", "admin_pin");
    if (error) throw new Error("Could not change PIN");
    return { ok: true };
  });
