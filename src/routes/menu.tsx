import { createFileRoute } from "@tanstack/react-router";

import { MenuSection } from "@/components/MenuSection";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Baklava, Kunafa & Taarten | Al Malek Sweets" },
      {
        name: "description",
        content:
          "Bekijk het volledige menu: gemengde baklava, Kol W Shkor, Mabroume met pistache, Nabulsi kunafa, basbousa, Halawet El Jibn en taarten.",
      },
      { property: "og:title", content: "Menu — Al Malek Sweets Utrecht" },
      {
        property: "og:description",
        content: "Syrische baklava, siroopdesserts en feesttaarten, dagelijks vers uit onze bakkerij.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { t } = useI18n();
  return (
    <>
      <div className="bg-royal-gradient py-16 text-center">
        <h1 className="font-display text-4xl text-gold-shine sm:text-5xl">{t("menu_title")}</h1>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-cream/80">{t("menu_sub")}</p>
      </div>
      <MenuSection />
    </>
  );
}
