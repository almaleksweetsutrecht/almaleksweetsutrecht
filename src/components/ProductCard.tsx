import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { money, useI18n } from "@/lib/i18n";
import { unitKey, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { t, tl } = useI18n();
  const { add } = useCart();

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-royal transition-all duration-500 hover:-translate-y-2 hover:border-gold/60 hover:shadow-[0_30px_60px_-24px_var(--gold-deep)]">
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={product.image}
          alt={tl(product.name)}
          loading="lazy"
          width={900}
          height={700}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-royal-deep/70 via-transparent to-transparent opacity-70" />
        {product.badge && (
          <span className="absolute start-3 top-3 rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-royal-deep">
            {tl(product.badge)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg leading-snug text-foreground">{tl(product.name)}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {tl(product.description)}
        </p>
        <div className="mt-1 flex items-center justify-between gap-3 border-t border-border pt-4">
          <div>
            <span className="font-display text-xl text-gold-deep">{money(product.price)}</span>
            <span className="ms-1 text-xs text-muted-foreground">{t(unitKey[product.unit])}</span>
          </div>
          <Button
            variant="gold"
            size="sm"
            onClick={() => {
              add(product);
              toast.success(`${tl(product.name)} — ${t("added")}`);
            }}
          >
            <Plus />
            {t("add_to_cart")}
          </Button>
        </div>
      </div>
    </article>
  );
}
