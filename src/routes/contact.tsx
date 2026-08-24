import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { STORE, whatsappLink } from "@/lib/store-info";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Openingstijden — Al Malek Sweets Utrecht" },
      {
        name: "description",
        content:
          "Bezoek Al Malek Sweets op Amsterdamsestraatweg 101, 3513 AC Utrecht. Bel of WhatsApp +31 685 158 883 voor bestellingen en taarten op maat.",
      },
      { property: "og:title", content: "Contact — Al Malek Sweets Utrecht" },
      {
        property: "og:description",
        content: "Adres, openingstijden, WhatsApp en routebeschrijving naar onze winkel in Utrecht.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      <div className="bg-royal-gradient py-16 text-center">
        <h1 className="font-display text-4xl text-gold-shine sm:text-5xl">{t("contact_title")}</h1>
        <p className="arabic mt-3 text-xl text-gold/90">{STORE.nameAr}</p>
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <Reveal className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-7 shadow-royal">
            <h2 className="font-display text-2xl">{t("nav_contact")}</h2>
            <div className="mt-5 space-y-4 text-sm">
              <a
                href={STORE.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 hover:text-gold-deep"
              >
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                {STORE.address}
              </a>
              <a href={`tel:+${STORE.phoneRaw}`} className="flex gap-3 hover:text-gold-deep">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                {STORE.phone}
              </a>
              <a href={`mailto:${STORE.email}`} className="flex gap-3 hover:text-gold-deep">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                {STORE.email}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold">
                <a href={whatsappLink("Hello Al Malek Sweets!")} target="_blank" rel="noreferrer">
                  <MessageCircle />
                  {t("whatsapp_order")}
                </a>
              </Button>
              <Button asChild variant="goldOutline">
                <a href={STORE.facebook} target="_blank" rel="noreferrer">
                  <Facebook />
                  Facebook
                </a>
              </Button>
              <Button asChild variant="goldOutline">
                <a href={STORE.instagram} target="_blank" rel="noreferrer">
                  <Instagram />
                  Instagram
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-7 shadow-royal">
            <h2 className="font-display text-2xl">{t("opening")}</h2>
            <p className="mt-4 text-sm text-muted-foreground">{t("hours_week")}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t("hours_sun")}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="h-full min-h-96 overflow-hidden rounded-xl border border-gold/40 shadow-royal">
            <iframe
              title="Al Malek Sweets — Amsterdamsestraatweg 101, Utrecht"
              src={STORE.maps}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-96 w-full border-0"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
