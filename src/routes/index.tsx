import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

import customCakeImg from "@/assets/custom-cake.jpg";
import pistachioHarissaAsset from "@/assets/luxury/image-2.webp.asset.json";
import pastryTrayAsset from "@/assets/luxury/image-23.png.asset.json";
import roundPastriesAsset from "@/assets/luxury/image-24.png.asset.json";
import kunafaAsset from "@/assets/luxury/image-25.png.asset.json";
import pistachioRollsAsset from "@/assets/luxury/image-3.webp.asset.json";
import pistachioNestsAsset from "@/assets/luxury/image-4.webp.asset.json";
import pistachioFlowersAsset from "@/assets/luxury/image-5.webp.asset.json";
import creamyDessertAsset from "@/assets/luxury/image-6.webp.asset.json";
import baklavaSquaresAsset from "@/assets/luxury/image-7.webp.asset.json";
import { Crown } from "@/components/Crown";
import { LuxuryImage } from "@/components/LuxuryImage";
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
          "Verse Syrische zoetwaren in Utrecht: baklava, kunafa, mabroume en taarten op maat. Online reserveren en ophalen in de winkel.",
      },
      { property: "og:title", content: "Al Malek Sweets — Syrische zoetwaren in Utrecht" },
      {
        property: "og:description",
        content:
          "Handgemaakte baklava, kunafa en luxe taarten met echte pistache. Reserveer online en haal af in Utrecht.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, tl } = useI18n();
  const { products } = useShopProducts();
  const featured = products.filter((p) => p.featured);
  const gallery = [
    { src: pastryTrayAsset.url, alt: "Vers gebakken Syrische bladerdeeggebakjes", className: "lg:col-span-5 lg:row-span-2" },
    { src: roundPastriesAsset.url, alt: "Goudbruine handgemaakte gebakjes", className: "lg:col-span-3" },
    { src: pistachioRollsAsset.url, alt: "Mabrouma rollen gevuld met pistache", className: "lg:col-span-4" },
    { src: pistachioFlowersAsset.url, alt: "Krokante pistachegebakjes", className: "lg:col-span-3" },
    { src: creamyDessertAsset.url, alt: "Romig dessert met gemalen pistache", className: "lg:col-span-4" },
    { src: baklavaSquaresAsset.url, alt: "Baklava vierkantjes met pistache", className: "lg:col-span-12" },
  ];

  return (
    <>
      <section className="relative isolate min-h-[760px] overflow-hidden bg-royal-gradient sm:min-h-[860px]">
        <div className="absolute inset-0 opacity-45 sm:opacity-70" aria-hidden="true">
          <LuxuryImage src={pistachioHarissaAsset.url} alt="" eager depth={0.04} className="absolute -start-20 top-10 h-[38rem] w-[25rem] -rotate-6 sm:-start-14 lg:start-[2%]" imageClassName="object-cover" />
          <LuxuryImage src={kunafaAsset.url} alt="" eager depth={0.065} className="absolute -end-24 bottom-8 h-[34rem] w-[25rem] rotate-5 sm:-end-10 lg:end-[2%]" imageClassName="object-cover" />
          <LuxuryImage src={pistachioNestsAsset.url} alt="" eager depth={0.1} className="absolute end-[14%] top-10 hidden h-52 w-40 rotate-3 lg:block" imageClassName="object-cover" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-royal-deep/75 via-royal-deep/90 to-royal-deep" />
        <div className="absolute inset-y-0 left-1/2 w-full max-w-3xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--royal-deep)_82%,transparent)_20%,transparent_72%)]" />
        <div className="relative mx-auto flex min-h-[760px] max-w-4xl flex-col items-center justify-center px-4 py-24 text-center sm:min-h-[860px] sm:px-6">
          <div className="flex flex-col items-center">
            <span className="crown-float">
              <Crown className="h-20 w-28 sm:h-24 sm:w-36" />
            </span>
            <p className="-mt-1 font-display text-3xl font-bold uppercase tracking-[0.16em] text-gold-shine sm:text-5xl">
              AL MALEK
            </p>
            <span className="mt-2 h-[3px] w-full max-w-[16rem] rounded-full bg-gold-gradient sm:max-w-sm" />
            <p className="arabic mt-3 text-2xl text-gold/90 sm:text-3xl">{STORE.nameAr}</p>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.4em] text-gold">{t("hero_kicker")}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-gold-shine sm:text-6xl">
            {t("hero_title")}
          </h1>
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

      <section className="relative overflow-hidden border-y border-gold/20 bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">AL MALEK SIGNATURE</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              {tl({ nl: "De koninklijke collectie", ar: "المجموعة الملكية", en: "The royal collection" })}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
              {tl({
                nl: "Met de hand gevormd, royaal gevuld en iedere dag vers afgewerkt.",
                ar: "مصنوعة يدوياً، غنية بالحشوة وطازجة كل يوم.",
                en: "Hand-shaped, generously filled and finished fresh every day.",
              })}
            </p>
          </Reveal>
          <div className="mt-12 grid auto-rows-[17rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {gallery.map((image, index) => (
              <Reveal key={image.src} delay={(index % 3) * 90} className={image.className}>
                <LuxuryImage
                  src={image.src}
                  alt={image.alt}
                  depth={0.045 + (index % 3) * 0.018}
                  className="h-full w-full"
                  imageClassName="object-cover"
                />
              </Reveal>
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
    </>
  );
}
