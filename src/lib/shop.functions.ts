import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const itemSchema = z.object({
  slug: z.string().max(120),
  name: z.string().max(200),
  qty: z.number().min(1).max(999),
  price: z.number().min(0).max(100000),
});

const orderSchema = z.object({
  customerName: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(4).max(40),
  email: z.string().trim().max(160).optional().or(z.literal("")),
  fulfilment: z.enum(["pickup", "delivery"]),
  address: z.string().trim().max(300).optional().or(z.literal("")),
  paymentMethod: z.enum(["ideal", "card", "cash"]),
  wantedDate: z.string().max(20).optional().or(z.literal("")),
  wantedTime: z.string().max(20).optional().or(z.literal("")),
  notes: z.string().max(1000).optional().or(z.literal("")),
  items: z.array(itemSchema).min(1).max(60),
  subtotal: z.number().min(0),
  deliveryFee: z.number().min(0),
  total: z.number().min(0),
});

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: data.customerName,
        phone: data.phone,
        email: data.email || null,
        fulfilment: data.fulfilment,
        address: data.address || null,
        payment_method: data.paymentMethod,
        payment_status: data.paymentMethod === "cash" ? "on_pickup" : "pending",
        wanted_date: data.wantedDate || null,
        wanted_time: data.wantedTime || null,
        notes: data.notes || null,
        items: data.items,
        subtotal: data.subtotal,
        delivery_fee: data.deliveryFee,
        total: data.total,
        status: "new",
      })
      .select("id, reference")
      .single();

    if (error) {
      console.error("createOrder failed", error.message);
      throw new Error("Order could not be saved");
    }
    return { id: row.id as string, reference: row.reference as string };
  });

const cakeSchema = z.object({
  customerName: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(4).max(40),
  occasion: z.string().max(60).optional().or(z.literal("")),
  size: z.string().max(60).optional().or(z.literal("")),
  layers: z.string().max(20).optional().or(z.literal("")),
  flavour: z.string().max(60).optional().or(z.literal("")),
  messageOnCake: z.string().max(200).optional().or(z.literal("")),
  fulfilment: z.enum(["pickup", "delivery"]),
  wantedDate: z.string().max(20).optional().or(z.literal("")),
  wantedTime: z.string().max(20).optional().or(z.literal("")),
  notes: z.string().max(1000).optional().or(z.literal("")),
  referenceImageUrl: z.string().max(300).optional().or(z.literal("")),
});

export const createCakeRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => cakeSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("cake_requests")
      .insert({
        customer_name: data.customerName,
        phone: data.phone,
        occasion: data.occasion || null,
        size: data.size || null,
        layers: data.layers || null,
        flavour: data.flavour || null,
        message_on_cake: data.messageOnCake || null,
        fulfilment: data.fulfilment,
        wanted_date: data.wantedDate || null,
        wanted_time: data.wantedTime || null,
        notes: data.notes || null,
        reference_image_url: data.referenceImageUrl || null,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error("createCakeRequest failed", error.message);
      throw new Error("Request could not be saved");
    }
    return { id: row.id as string };
  });
