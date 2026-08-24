import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { products as fallbackProducts, type CategoryId, type Product, type Unit } from "./products";

export type ProductRow = {
  id: string;
  slug: string;
  category: string;
  name_nl: string;
  name_ar: string;
  name_en: string;
  desc_nl: string;
  desc_ar: string;
  desc_en: string;
  price: number | string;
  unit: string;
  image_url: string | null;
  featured: boolean;
  available: boolean;
  sort_order: number;
};

const imageBySlug: Record<string, string> = Object.fromEntries(
  fallbackProducts.map((p) => [p.id, p.image]),
);

const fallbackImage = fallbackProducts[0]!.image;

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.slug,
    category: (["baklava", "syrup", "cakes"].includes(row.category)
      ? row.category
      : "baklava") as CategoryId,
    name: { nl: row.name_nl, ar: row.name_ar, en: row.name_en },
    description: { nl: row.desc_nl, ar: row.desc_ar, en: row.desc_en },
    price: Number(row.price),
    unit: (["kg", "piece", "box", "cake"].includes(row.unit) ? row.unit : "box") as Unit,
    image: row.image_url || imageBySlug[row.slug] || fallbackImage,
    featured: row.featured,
  };
}

export function useShopProducts() {
  const query = useQuery({
    queryKey: ["shop-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("available", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data as unknown as ProductRow[]).map(rowToProduct);
    },
    staleTime: 60_000,
  });

  return {
    products: query.data && query.data.length > 0 ? query.data : fallbackProducts,
    isLoading: query.isLoading,
  };
}
