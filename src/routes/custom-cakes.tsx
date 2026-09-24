import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import customCakeImg from "@/assets/custom-cake.jpg";
import pistachioCake from "@/assets/pistachio-cake.jpg";
import chocolateCake from "@/assets/chocolate-cake.jpg";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { STORE, whatsappLink } from "@/lib/store-info";

export const Route = createFileRoute("/custom-cakes")({
  head: () => ({
    meta: [
      { title: "Taart op maat reserveren — Bruiloft & Verjaardag | Al Malek Sweets" },
      {
        name: "description",
        content:
          "Reserveer een taart op maat in Utrecht: kies formaat, lagen en smaak, upload je voorbeeldontwerp en bepaal ophaal- of bezorgmoment.",
      },
      { property: "og:title", content: "Taart op maat — Al Malek Sweets" },
      {
        property: "og:description",
        content: "Bruiloften, verlovingen en verjaardagen: wij bouwen jouw droomtaart met echte pistache en bladgoud.",
      },
    ],
  }),
  component: CustomCakesPage,
});

function CustomCakesPage() {
  const { t } = useI18n();

  const message = `*${STORE.name} — ${t("cakes_title")}*\n${t("reserve_now")}`;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-royal-gradient">
        <img
          src={customCakeImg}
          alt="Bruidstaart op maat met gouden details"
          width={1400}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-linear-to-b from-royal-deep/85 to-royal-deep/95" />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <h1 className="font-display text-4xl text-gold-shine sm:text-5xl">{t("cakes_title")}</h1>
          <p className="mt-5 text-cream/85">{t("cakes_sub")}</p>
          <div className="mt-8">
            <Button asChild variant="gold" size="xl" className="glow-gold">
              <a href={whatsappLink(message)} target="_blank" rel="noreferrer">
                <Sparkles />
                {t("reserve_now")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
          {[
            { img: pistachioCake, label: t("flavor_pistachio") },
            { img: chocolateCake, label: t("flavor_chocolate") },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 120}>
              <div className="group relative overflow-hidden rounded-2xl border border-gold/30 shadow-royal">
                <img
                  src={c.img}
                  alt={c.label}
                  loading="lazy"
                  width={900}
                  height={700}
                  className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-royal-deep/85 to-transparent" />
                <p className="absolute bottom-5 start-6 font-display text-2xl text-gold">{c.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
