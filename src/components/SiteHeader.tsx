import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, Globe, Lock as LockIcon } from "lucide-react";
import { useState } from "react";

import { Crown } from "./Crown";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n, type Lang, type DictKey } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { STORE } from "@/lib/store-info";

const langs: { code: Lang; label: string }[] = [
  { code: "nl", label: "Nederlands" },
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
];

const nav: { to: string; key: DictKey }[] = [
  { to: "/", key: "nav_home" },
  { to: "/menu", key: "nav_menu" },
  { to: "/custom-cakes", key: "nav_cakes" },
  { to: "/contact", key: "nav_contact" },
];

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/25 bg-royal-gradient/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="crown-float">
            <Crown className="h-9 w-11 sm:h-11 sm:w-14" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold uppercase tracking-[0.22em] text-gold-shine sm:text-2xl">
              AL MALEK
            </span>
            <span className="arabic mt-1 text-sm text-gold/90 sm:text-base">{STORE.nameAr}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="relative text-sm uppercase tracking-[0.16em] text-cream/80 transition-colors hover:text-gold after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-gold-gradient after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{ className: "text-gold after:w-full" }}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="goldOutline" size="sm" className="gap-2">
                <Globe />
                <span className="font-semibold">{lang.toUpperCase()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              {langs.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={l.code === lang ? "font-semibold text-accent-foreground" : ""}
                >
                  <span className={l.code === "ar" ? "arabic" : ""}>{l.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="gold"
            size="sm"
            className="relative gap-2"
            onClick={() => setOpen(true)}
            aria-label={t("cart_title")}
          >
            <ShoppingBag />
            <span className="hidden sm:inline">{t("cart_title")}</span>
            {count > 0 && (
              <span className="absolute -end-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-royal-deep px-1 text-[11px] font-bold text-gold">
                {count}
              </span>
            )}
          </Button>

          <Button variant="goldOutline" size="icon" asChild aria-label={t("owner_login")}>
            <Link to="/admin" title={t("owner_login")}>
              <LockIcon />
            </Link>
          </Button>



          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="goldOutline" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="border-gold/30 bg-royal-gradient">
              <div className="mt-6 flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-3 font-display text-lg uppercase tracking-[0.16em] text-cream/85 transition-colors hover:bg-gold/10 hover:text-gold"
                    activeProps={{ className: "text-gold" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
