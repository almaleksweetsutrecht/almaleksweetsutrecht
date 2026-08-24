import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

import { Crown } from "./Crown";
import { useI18n } from "@/lib/i18n";
import { STORE } from "@/lib/store-info";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="bg-royal-gradient text-cream/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Crown className="h-9 w-11" />
            <div>
              <p className="font-display text-xl font-bold uppercase tracking-[0.2em] text-gold-shine">
                AL MALEK
              </p>
              <p className="arabic text-sm text-gold/90">{STORE.nameAr}</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{t("brand_sub")}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={STORE.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hairline-gold flex h-10 w-10 items-center justify-center rounded-full text-gold transition-all hover:bg-gold/15"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={STORE.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hairline-gold flex h-10 w-10 items-center justify-center rounded-full text-gold transition-all hover:bg-gold/15"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-display text-base uppercase tracking-[0.2em] text-gold">
            {t("nav_contact")}
          </h3>
          <a href={STORE.mapsLink} target="_blank" rel="noreferrer" className="flex gap-2 hover:text-gold">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {STORE.address}
          </a>
          <a href={`tel:+${STORE.phoneRaw}`} className="flex gap-2 hover:text-gold">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {STORE.phone}
          </a>
          <a href={`mailto:${STORE.email}`} className="flex gap-2 hover:text-gold">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {STORE.email}
          </a>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-display text-base uppercase tracking-[0.2em] text-gold">
            {t("opening")}
          </h3>
          <p>{t("hours_week")}</p>
          <p>{t("hours_sun")}</p>
          <div className="mt-4 flex flex-col gap-2">
            <Link to="/menu" className="hover:text-gold">
              {t("nav_menu")}
            </Link>
            <Link to="/custom-cakes" className="hover:text-gold">
              {t("nav_cakes")}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gold/20 px-4 py-5 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} AL MALEK SWEETS · {t("footer_rights")}
      </div>
    </footer>
  );
}
