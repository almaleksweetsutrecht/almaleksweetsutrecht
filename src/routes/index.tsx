import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import customCakeImg from "@/assets/custom-cake.jpg";
import { Crown } from "@/components/Crown";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { CustomCakeDialog } from "@/components/CustomCakeDialog";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useShopProducts } from "@/lib/shop";
import { STORE } from "@/lib/store-info";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Malek Sweets Utrecht — Syrische Baklava, Kunafa & Taarten" },
      {
        name: "description",
        content:
          "Verse Syrische zoetwaren in Utrecht: baklava, kunafa, mabroume en taarten op maat. Online bestellen voor ophalen of bezorging.",
      },
      { property: "og:title", content: "Al Malek Sweets — Syrische zoetwaren in Utrecht" },
      {
        property: "og:description",
        content:
          "Handgemaakte baklava, kunafa en luxe taarten met echte pistache. Bestel online voor ophalen of bezorging in Utrecht.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const { products } = useShopProducts();
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-royal-gradient">
        <img
          src={heroImg}
          alt="Syrische zoetwaren van Al Malek Sweets"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-royal-deep/80 via-royal/70 to-royal-deep/95" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-28 text-center sm:px-6 sm:py-36">
          <span className="crown-float">
            <Crown className="h-16 w-20 sm:h-20 sm:w-24" />
          </span>
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold">{t("hero_kicker")}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-gold-shine sm:text-6xl">
            {t("hero_title")}
          </h1>
          <p className="arabic mt-4 text-2xl text-gold/90 sm:text-3xl">{STORE.nameAr}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/85">{t("hero_text")}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="xl" className="glow-gold">
              <Link to="/menu">
                {t("hero_cta")}
                <ArrowRight />
              </Link>
            </Button>
            <CustomCakeDialog>
              <Button variant="goldOutline" size="xl">
                <Sparkles />
                {t("hero_cta2")}
              </Button>
            </CustomCakeDialog>
          </div>
          <div className="mt-14 grid w-full grid-cols-3 gap-4 border-t border-gold/25 pt-8">
            {[
              { v: "25+", k: "stat_years" as const },
              { v: "40+", k: "stat_items" as const },
              { v: "100%", k: "stat_fresh" as const },
            ].map((s) => (
              <div key={s.k}>
                <p className="font-display text-2xl text-gold sm:text-3xl">{s.v}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-cream/70 sm:text-xs">
                  {t(s.k)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">{t("featured")}</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">{t("menu_title")}</h2>
        </Reveal>
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="royal" size="lg">
            <Link to="/menu">
              {t("view_all")}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">AL MALEK SWEETS</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">{t("story_title")}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{t("story_text")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link to="/contact">
                  <MapPin />
                  {t("contact_title")}
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-2xl border border-gold/40 shadow-royal">
              <img
                src={customCakeImg}
                alt="Bruidstaart op maat"
                loading="lazy"
                width={1400}
                height={900}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-royal-gradient py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl text-gold-shine sm:text-4xl">{t("cakes_title")}</h2>
          <p className="mt-4 text-cream/80">{t("cakes_sub")}</p>
          <div className="mt-8">
            <CustomCakeDialog>
              <Button variant="gold" size="xl" className="glow-gold">
                <Sparkles />
                {t("reserve_now")}
              </Button>
            </CustomCakeDialog>
          </div>
        </div>
      </section>
    </>
  );
}
