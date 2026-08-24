import { useState } from "react";

import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { categories, type CategoryId } from "@/lib/products";
import { useShopProducts } from "@/lib/shop";

export function MenuSection({ id = "menu" }: { id?: string }) {
  const { t } = useI18n();
  const [active, setActive] = useState<CategoryId | "all">("all");
  const { products } = useShopProducts();

  const shown = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">AL MALEK</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">{t("menu_title")}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("menu_sub")}</p>
      </Reveal>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <Button
          size="sm"
          variant={active === "all" ? "gold" : "goldOutline"}
          onClick={() => setActive("all")}
        >
          {t("cat_all")}
        </Button>
        {categories.map((c) => (
          <Button
            key={c.id}
            size="sm"
            variant={active === c.id ? "gold" : "goldOutline"}
            onClick={() => setActive(c.id)}
          >
            {t(c.key)}
          </Button>
        ))}
      </div>

      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 90}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
