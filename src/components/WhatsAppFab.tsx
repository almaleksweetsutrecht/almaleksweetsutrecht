import { MessageCircle } from "lucide-react";

import { useI18n } from "@/lib/i18n";
import { STORE, whatsappLink } from "@/lib/store-info";

export function WhatsAppFab() {
  const { t } = useI18n();

  return (
    <a
      href={whatsappLink(`مرحباً ${STORE.nameAr} / Hello Al Malek Sweets — I would like to place an order.`)}
      target="_blank"
      rel="noreferrer"
      className="glow-gold fixed bottom-5 end-5 z-50 flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-3 font-semibold text-royal-deep transition-transform duration-300 hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-sm uppercase tracking-wide sm:inline">
        {t("whatsapp_order")}
      </span>
    </a>
  );
}
