import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Palette, Truck, Sparkles } from "lucide-react";

import customCakeImg from "@/assets/custom-cake.jpg";
import pistachioCake from "@/assets/pistachio-cake.jpg";
import chocolateCake from "@/assets/chocolate-cake.jpg";
import { CustomCakeDialog } from "@/components/CustomCakeDialog";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

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

  const steps = [
    { icon: Palette, title: t("size"), text: t("cakes_sub") },
    { icon: CalendarCheck, title: t("date"), text: t("photo_hint") },
    { icon: Truck, title: t("fulfilment"), text: `${t("pickup")} · ${t("delivery")}` },
  ];

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
            <CustomCakeDialog>
              <Button variant="gold" size="xl" className="glow-gold">
                <Sparkles />
                {t("reserve_now")}
              </Button>
            </CustomCakeDialog>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 100}>
            <div className="h-full rounded-xl border border-border bg-card p-7 shadow-royal transition-all duration-500 hover:-translate-y-1 hover:border-gold/60">
              <s.icon className="h-7 w-7 text-gold-deep" />
              <h2 className="mt-4 font-display text-xl">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          </Reveal>
        ))}
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
