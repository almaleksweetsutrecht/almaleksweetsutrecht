import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import customCakeImg from "@/assets/custom-cake.jpg";
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

    </>
  );
}
