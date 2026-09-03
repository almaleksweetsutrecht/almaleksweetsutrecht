import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "nl" | "ar" | "en";

export type Localized = Record<Lang, string>;

export const dict = {
  nav_home: { nl: "Home", ar: "الرئيسية", en: "Home" },
  nav_menu: { nl: "Menu", ar: "القائمة", en: "Menu" },
  nav_cakes: { nl: "Bruidstaarten", ar: "طلب كيك", en: "Custom Cakes" },
  nav_contact: { nl: "Contact", ar: "اتصل بنا", en: "Contact" },
  brand_sub: { nl: "Syrische Zoetwaren · Utrecht", ar: "حلويات شرقية · أوترخت", en: "Syrian Sweets · Utrecht" },
  hero_kicker: { nl: "Sinds generaties", ar: "حرفة الأجداد", en: "Heritage craft" },
  hero_title: {
    nl: "De koning van Syrische zoetwaren",
    ar: "ملك الحلويات السورية",
    en: "The king of Syrian sweets",
  },
  hero_text: {
    nl: "Dagelijks vers gebakken baklava, kunafa en luxe taarten met echte pistache en boter. Bestel online voor ophalen in Utrecht of bezorging aan huis.",
    ar: "بقلاوة وكنافة وكيك فاخر يُحضَّر يومياً بالفستق الحلبي والسمن الأصلي. اطلب أونلاين للاستلام من متجرنا في أوترخت أو التوصيل إلى منزلك.",
    en: "Baklava, kunafa and celebration cakes baked fresh daily with real pistachio and butter. Order online for pickup in Utrecht or home delivery.",
  },
  hero_cta: { nl: "Bekijk het menu", ar: "تصفح القائمة", en: "Explore the menu" },
  hero_cta2: { nl: "Taart op maat", ar: "اطلب كيك خاص", en: "Reserve a custom cake" },
  stat_years: { nl: "jaar vakmanschap", ar: "عاماً من الخبرة", en: "years of craft" },
  stat_items: { nl: "soorten zoetwaren", ar: "نوعاً من الحلويات", en: "kinds of sweets" },
  stat_fresh: { nl: "dagelijks vers", ar: "طازج يومياً", en: "baked daily" },
  menu_title: { nl: "Onze Zoetwaren", ar: "حلوياتنا", en: "Our Sweets" },
  menu_sub: {
    nl: "Elke schaal wordt met de hand gemaakt in onze bakkerij aan de Amsterdamsestraatweg.",
    ar: "كل صينية تُصنع يدوياً في مطبخنا في أوترخت.",
    en: "Every tray is handmade in our bakery on Amsterdamsestraatweg.",
  },
  cat_all: { nl: "Alles", ar: "الكل", en: "All" },
  cat_baklava: { nl: "Baklava & droge koek", ar: "بقلاوة وحلويات جافة", en: "Baklava & Dry Pastries" },
  cat_syrup: { nl: "Warme & siroopdesserts", ar: "حلويات بالقطر", en: "Syrupy & Warm Desserts" },
  cat_cakes: { nl: "Taarten & feestspecials", ar: "كيك ومناسبات", en: "Cakes & Celebrations" },
  add_to_cart: { nl: "In de mand", ar: "أضف إلى السلة", en: "Add to cart" },
  added: { nl: "toegevoegd aan je mand", ar: "أُضيف إلى سلتك", en: "added to your cart" },
  per_kg: { nl: "per kg", ar: "للكيلو", en: "per kg" },
  per_piece: { nl: "per stuk", ar: "للحبة", en: "per piece" },
  per_box: { nl: "per doos", ar: "للعلبة", en: "per box" },
  per_cake: { nl: "per taart", ar: "للكيكة", en: "per cake" },
  cart_title: { nl: "Jouw mand", ar: "سلة الطلبات", en: "Your cart" },
  cart_empty: { nl: "Je mand is nog leeg.", ar: "سلتك فارغة.", en: "Your cart is still empty." },
  subtotal: { nl: "Subtotaal", ar: "المجموع", en: "Subtotal" },
  delivery_fee: { nl: "Bezorgkosten", ar: "رسوم التوصيل", en: "Delivery fee" },
  total: { nl: "Totaal", ar: "الإجمالي", en: "Total" },
  pickup: { nl: "Ophalen in de winkel", ar: "استلام من المتجر", en: "Store pickup" },
  delivery: { nl: "Bezorging aan huis", ar: "توصيل إلى المنزل", en: "Home delivery" },
  free: { nl: "Gratis", ar: "مجاناً", en: "Free" },
  your_name: { nl: "Naam", ar: "الاسم", en: "Name" },
  phone: { nl: "Telefoon", ar: "رقم الهاتف", en: "Phone" },
  address: { nl: "Bezorgadres", ar: "عنوان التوصيل", en: "Delivery address" },
  date: { nl: "Datum", ar: "التاريخ", en: "Date" },
  time: { nl: "Tijd", ar: "الوقت", en: "Time" },
  notes: { nl: "Opmerkingen", ar: "ملاحظات", en: "Notes" },
  place_order: { nl: "Bestelling via WhatsApp", ar: "إتمام الطلب عبر واتساب", en: "Send order via WhatsApp" },
  order_sent: {
    nl: "Bestelling klaar — WhatsApp opent nu.",
    ar: "طلبك جاهز — سيتم فتح واتساب الآن.",
    en: "Order ready — WhatsApp is opening now.",
  },
  fill_required: { nl: "Vul naam en telefoon in.", ar: "يرجى إدخال الاسم ورقم الهاتف.", en: "Please add your name and phone." },
  cakes_title: { nl: "Taart op maat", ar: "كيك حسب الطلب", en: "Custom Cakes" },
  cakes_sub: {
    nl: "Bruiloften, verlovingen, verjaardagen en geboortes — wij bouwen jouw taart precies zoals je hem droomt.",
    ar: "أعراس وخطوبة وأعياد ميلاد ومناسبات — نصنع الكيك كما تتخيله تماماً.",
    en: "Weddings, engagements, birthdays and newborns — we build your cake exactly as you imagine it.",
  },
  reserve_now: { nl: "Reserveer je taart", ar: "احجز كيكتك", en: "Reserve your cake" },
  occasion: { nl: "Gelegenheid", ar: "المناسبة", en: "Occasion" },
  wedding: { nl: "Bruiloft", ar: "عرس", en: "Wedding" },
  birthday: { nl: "Verjaardag", ar: "عيد ميلاد", en: "Birthday" },
  engagement: { nl: "Verloving", ar: "خطوبة", en: "Engagement" },
  other: { nl: "Anders", ar: "أخرى", en: "Other" },
  size: { nl: "Formaat", ar: "الحجم", en: "Size" },
  layers: { nl: "Aantal lagen", ar: "عدد الطبقات", en: "Layers" },
  flavor: { nl: "Smaak", ar: "النكهة", en: "Flavour" },
  flavor_pistachio: { nl: "Pistache-room", ar: "فستق حلبي", en: "Pistachio cream" },
  flavor_chocolate: { nl: "Belgische chocolade", ar: "شوكولا بلجيكية", en: "Belgian chocolate" },
  flavor_lotus: { nl: "Lotus karamel", ar: "لوتس كراميل", en: "Lotus caramel" },
  flavor_vanilla: { nl: "Vanille & aardbei", ar: "فانيلا وفراولة", en: "Vanilla & strawberry" },
  flavor_ashta: { nl: "Ashta & honing", ar: "قشطة وعسل", en: "Ashta & honey" },
  reference_photo: { nl: "Voorbeeldfoto uploaden", ar: "أرفق صورة للتصميم", en: "Upload reference photo" },
  photo_hint: {
    nl: "Optioneel — stuur de foto na in WhatsApp voor het exacte ontwerp.",
    ar: "اختياري — أرسل الصورة في واتساب للحصول على التصميم الدقيق.",
    en: "Optional — send the photo in WhatsApp for the exact design.",
  },
  fulfilment: { nl: "Ophalen of bezorgen", ar: "الاستلام أو التوصيل", en: "Pickup or delivery" },
  send_request: { nl: "Verstuur aanvraag", ar: "أرسل الطلب", en: "Send request" },
  est_price: { nl: "Indicatie", ar: "السعر التقديري", en: "Estimate" },
  contact_title: { nl: "Bezoek onze winkel", ar: "زوروا متجرنا", en: "Visit our shop" },
  opening: { nl: "Openingstijden", ar: "أوقات العمل", en: "Opening hours" },
  hours_week: { nl: "Ma – Za: 09:00 – 21:00", ar: "الاثنين – السبت: ٠٩:٠٠ – ٢١:٠٠", en: "Mon – Sat: 09:00 – 21:00" },
  hours_sun: { nl: "Zondag: 11:00 – 20:00", ar: "الأحد: ١١:٠٠ – ٢٠:٠٠", en: "Sunday: 11:00 – 20:00" },
  whatsapp_order: { nl: "Direct bestellen", ar: "اطلب الآن", en: "Order now" },
  view_all: { nl: "Volledig menu", ar: "القائمة الكاملة", en: "Full menu" },
  featured: { nl: "Klantfavorieten", ar: "الأكثر مبيعاً", en: "Guest favourites" },
  story_title: { nl: "Damascus in Utrecht", ar: "دمشق في أوترخت", en: "Damascus in Utrecht" },
  story_text: {
    nl: "Al Malek Sweets brengt de zoetwaren van Damascus en Aleppo naar Nederland: dun uitgerold deeg, geklaarde boter, Syrische pistache en siroop met bloesemwater. Alles wordt elke ochtend versgebakken.",
    ar: "حلويات الملك تنقل مذاق دمشق وحلب إلى هولندا: عجين رقيق، سمنة مصفّاة، فستق حلبي، وقطر بماء الزهر. كل شيء يُخبز طازجاً كل صباح.",
    en: "Al Malek Sweets brings the pastry houses of Damascus and Aleppo to the Netherlands: paper-thin dough, clarified butter, Syrian pistachio and blossom-water syrup. Everything is baked fresh each morning.",
  },
  payment_method: { nl: "Manier van reserveren", ar: "طريقة الحجز", en: "Reservation method" },
  pay_cash: {
    nl: "Cash bij ophalen of bezorging",
    ar: "الدفع كاش عند الاستلام أو التوصيل",
    en: "Cash on pickup or delivery",
  },
  pay_preview: {
    nl: "Geen online betaling: je plaatst een reservering en betaalt cash bij ophalen of bezorging.",
    ar: "لا يوجد دفع إلكتروني: أنت ترسل حجزاً وتدفع كاش عند الاستلام أو التوصيل.",
    en: "No online payment: you send a reservation and pay cash on pickup or delivery.",
  },
  reserve_title: { nl: "Reservering / bestelaanvraag", ar: "حجز الحلويات", en: "Reservation / order request" },
  checkout_now: { nl: "Reservering versturen", ar: "تأكيد الحجز", en: "Send reservation" },
  or_whatsapp: { nl: "Reserveren via WhatsApp", ar: "الحجز عبر واتساب", en: "Order via WhatsApp" },
  ask_whatsapp: { nl: "Vraag via WhatsApp", ar: "اسأل عبر واتساب", en: "Ask via WhatsApp" },
  order_saved: {
    nl: "Bedankt! Je reservering is doorgestuurd naar de winkel.",
    ar: "شكراً لك! تم إرسال حجزك إلى المتجر.",
    en: "Thank you! Your reservation has been sent to the shop.",
  },
  order_failed: {
    nl: "Reservering opslaan mislukte — probeer WhatsApp.",
    ar: "تعذّر حفظ الحجز — جرّب واتساب.",
    en: "We could not save the reservation — please try WhatsApp.",
  },

  owner_login: { nl: "Eigenaar", ar: "لوحة التحكم", en: "Owner" },
  footer_rights: { nl: "Alle rechten voorbehouden.", ar: "جميع الحقوق محفوظة.", en: "All rights reserved." },
} satisfies Record<string, Localized>;

export type DictKey = keyof typeof dict;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey) => string;
  tl: (value: Localized) => string;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("nl");

  useEffect(() => {
    const stored = window.localStorage.getItem("almalek-lang") as Lang | null;
    if (stored === "nl" || stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("almalek-lang", l);
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      dir,
      t: (key) => dict[key][lang],
      tl: (value) => value[lang],
    }),
    [lang, setLang, dir],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export const money = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);
