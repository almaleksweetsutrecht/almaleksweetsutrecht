import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/product-image/$name")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const name = params.name;
        if (!/^[0-9a-f-]{36}\.(jpeg|png|webp)$/.test(name)) {
          return new Response("Not found", { status: 404 });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("product-images").download(name);
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(data, {
          headers: {
            "Content-Type": data.type || "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
