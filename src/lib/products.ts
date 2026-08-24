import type { Localized } from "./i18n";

import baklavaBox from "@/assets/baklava-box.jpg";
import kolWShkor from "@/assets/kol-w-shkor.jpg";
import mabroume from "@/assets/mabroume.jpg";
import warbat from "@/assets/warbat.jpg";
import barazek from "@/assets/barazek-maamoul.jpg";
import kunafa from "@/assets/kunafa.jpg";
import basbousa from "@/assets/basbousa.jpg";
import halawet from "@/assets/halawet-el-jibn.jpg";
import mafroukeh from "@/assets/mafroukeh.jpg";
import pistachioCake from "@/assets/pistachio-cake.jpg";
import chocolateCake from "@/assets/chocolate-cake.jpg";

export type CategoryId = "baklava" | "syrup" | "cakes";
export type Unit = "kg" | "piece" | "box" | "cake";

export type Product = {
  id: string;
  category: CategoryId;
  name: Localized;
  description: Localized;
  price: number;
  unit: Unit;
  image: string;
  featured?: boolean;
  badge?: Localized;
};

export const products: Product[] = [
  {
    id: "mixed-baklava-box",
    category: "baklava",
    price: 24.5,
    unit: "box",
    image: baklavaBox,
    featured: true,
    name: {
      nl: "Gemengde Syrische Baklava Doos",
      ar: "علبة بقلاوة سورية مشكّلة",
      en: "Mixed Syrian Baklava Box",
    },
    description: {
      nl: "Twaalf soorten baklava in één gouden doos: pistache, cashew, walnoot en amandel, gelaagd met geklaarde boter en lichte siroop.",
      ar: "اثنا عشر نوعاً من البقلاوة في علبة ذهبية واحدة: فستق، كاجو، جوز ولوز، بطبقات من السمنة الأصلية والقطر الخفيف.",
      en: "Twelve kinds of baklava in one gold box: pistachio, cashew, walnut and almond, layered with clarified butter and light syrup.",
    },
    badge: { nl: "Bestseller", ar: "الأكثر طلباً", en: "Bestseller" },
  },
  {
    id: "kol-w-shkor",
    category: "baklava",
    price: 27.0,
    unit: "kg",
    image: kolWShkor,
    featured: true,
    name: { nl: "Kol W Shkor (Cashewvingers)", ar: "كل وأشكر (أصابع كاجو)", en: "Kol W Shkor (Cashew Fingers)" },
    description: {
      nl: "Knapperige rolletjes filodeeg gevuld met romige cashewpasta, licht gedoopt in siroop met bloesemwater.",
      ar: "أصابع مقرمشة من عجين الفيلو محشوة بمعجون الكاجو الكريمي ومغموسة بقطر ماء الزهر.",
      en: "Crisp filo fingers filled with creamy cashew paste and lightly dipped in blossom-water syrup.",
    },
  },
  {
    id: "mabroume-pistachio",
    category: "baklava",
    price: 32.0,
    unit: "kg",
    image: mabroume,
    featured: true,
    name: { nl: "Mabroume met Pistache", ar: "مبرومة بالفستق الحلبي", en: "Mabroume with Pistachio" },
    description: {
      nl: "Gedraaide kadaifi-rollen royaal gevuld met Syrische pistache, in dunne schijfjes gesneden zodat het groene hart zichtbaar blijft.",
      ar: "لفائف مبرومة محشوة بسخاء بالفستق الحلبي وتُقطع رقائق ليظهر قلبها الأخضر.",
      en: "Twisted kadaifi rolls generously filled with Syrian pistachio, sliced thin so the green heart shows.",
    },
    badge: { nl: "Premium", ar: "فاخر", en: "Premium" },
  },
  {
    id: "warbat-cream",
    category: "baklava",
    price: 2.75,
    unit: "piece",
    image: warbat,
    name: { nl: "Warbat met Room", ar: "وربات بالقشطة", en: "Warbat with Cream" },
    description: {
      nl: "Vierkantjes bladerdeeg met verse ashta-room, poedersuiker en gemalen pistache. Het lekkerst op de dag zelf.",
      ar: "مربعات من العجين الرقيق محشوة بالقشطة الطازجة مع سكر ناعم وفستق مجروش. ألذّ ما تكون في يومها.",
      en: "Flaky pastry squares with fresh ashta cream, powdered sugar and ground pistachio. Best on the day.",
    },
  },
  {
    id: "barazek-maamoul-box",
    category: "baklava",
    price: 18.9,
    unit: "box",
    image: barazek,
    name: { nl: "Barazek & Maamoul Doos", ar: "علبة برازق ومعمول", en: "Barazek & Maamoul Box" },
    description: {
      nl: "Sesamkoekjes met pistache naast maamoul gevuld met dadels en walnoot — perfect bij thee of als cadeau.",
      ar: "برازق بالسمسم والفستق مع معمول محشو بالتمر والجوز — مثالية مع الشاي أو كهدية.",
      en: "Sesame-pistachio barazek beside maamoul filled with dates and walnut — perfect with tea or as a gift.",
    },
  },
  {
    id: "nabulsi-kunafa",
    category: "syrup",
    price: 26.5,
    unit: "kg",
    image: kunafa,
    featured: true,
    name: { nl: "Nabulsi Kunafa (fijn / grof)", ar: "كنافة نابلسية (ناعمة / خشنة)", en: "Nabulsi Kunafa (fine / coarse)" },
    description: {
      nl: "Warme kunafa met gesmolten Nabulsi-kaas, keuze uit fijn of grof deeg, overgoten met siroop en pistache.",
      ar: "كنافة ساخنة بالجبنة النابلسية، ناعمة أو خشنة، تُسكب عليها القطر وتُزيَّن بالفستق.",
      en: "Hot kunafa with melted Nabulsi cheese, fine or coarse dough, poured with syrup and topped with pistachio.",
    },
    badge: { nl: "Warm uit de oven", ar: "ساخنة من الفرن", en: "Straight from the oven" },
  },
  {
    id: "basbousa-namoora",
    category: "syrup",
    price: 19.5,
    unit: "kg",
    image: basbousa,
    name: {
      nl: "Syrische Basbousa / Namoora met Amandel",
      ar: "بسبوسة / نمورة سورية باللوز",
      en: "Syrian Basbousa / Namoora with Almonds",
    },
    description: {
      nl: "Boterzachte griesmeelcake met kokos en yoghurt, bekroond met geblancheerde amandelen en warme siroop.",
      ar: "كيك السمولينا الطري مع جوز الهند واللبن، مزيّن باللوز المقشّر والقطر الدافئ.",
      en: "Buttery semolina cake with coconut and yoghurt, crowned with blanched almonds and warm syrup.",
    },
  },
  {
    id: "halawet-el-jibn",
    category: "syrup",
    price: 3.2,
    unit: "piece",
    image: halawet,
    name: { nl: "Halawet El Jibn", ar: "حلاوة الجبن", en: "Halawet El Jibn" },
    description: {
      nl: "Zachte kaasrolletjes van griesmeel gevuld met ashta, met rozensiroop en pistache. Damascus op zijn mooist.",
      ar: "لفائف الجبن الطرية بالسمولينا محشوة بالقشطة مع شراب الورد والفستق. دمشق بأبهى صورها.",
      en: "Soft semolina-cheese rolls filled with ashta, finished with rose syrup and pistachio. Damascus at its finest.",
    },
  },
  {
    id: "mafroukeh-cream",
    category: "syrup",
    price: 29.5,
    unit: "kg",
    image: mafroukeh,
    name: { nl: "Mafroukeh met Room", ar: "مفروكة بالقشطة", en: "Mafroukeh with Cream" },
    description: {
      nl: "Rijke geroosterde griesmeelbasis met boter en siroop, bedekt met dikke ashta-room en hele pistaches.",
      ar: "قاعدة سمولينا محمّصة بالسمنة والقطر، مغطاة بطبقة سميكة من القشطة والفستق الكامل.",
      en: "Rich toasted semolina base with butter and syrup, covered in thick ashta cream and whole pistachios.",
    },
  },
  {
    id: "pistachio-cream-cake",
    category: "cakes",
    price: 42.0,
    unit: "cake",
    image: pistachioCake,
    featured: true,
    name: { nl: "Pistache Roomtaart", ar: "كيك الفستق بالكريما", en: "Pistachio Cream Cake" },
    description: {
      nl: "Drie luchtige biscuitlagen met pistachecrème en mascarpone, afgewerkt met pistachekrokant en bladgoud. 8–10 personen.",
      ar: "ثلاث طبقات من الكيك الهش مع كريمة الفستق والماسكربوني، مزيّنة بالفستق المجروش وورق الذهب. تكفي ٨–١٠ أشخاص.",
      en: "Three airy sponge layers with pistachio crème and mascarpone, finished with pistachio crunch and gold leaf. Serves 8–10.",
    },
  },
  {
    id: "royal-chocolate-cake",
    category: "cakes",
    price: 39.5,
    unit: "cake",
    image: chocolateCake,
    name: { nl: "Royal Chocolade Laagjestaart", ar: "كيك الشوكولا الملكي", en: "Royal Chocolate Layer Cake" },
    description: {
      nl: "Donkere Belgische chocoladecake met glanzende ganache, hazelnootcrunch en 24-karaats gouden accenten. 8–10 personen.",
      ar: "كيك الشوكولا البلجيكية الداكنة مع غاناش لامع وكرانش البندق ولمسات ذهبية عيار ٢٤. تكفي ٨–١٠ أشخاص.",
      en: "Dark Belgian chocolate cake with glossy ganache, hazelnut crunch and 24-carat gold accents. Serves 8–10.",
    },
  },
];

export const categories: { id: CategoryId; key: "cat_baklava" | "cat_syrup" | "cat_cakes" }[] = [
  { id: "baklava", key: "cat_baklava" },
  { id: "syrup", key: "cat_syrup" },
  { id: "cakes", key: "cat_cakes" },
];

export const unitKey: Record<Unit, "per_kg" | "per_piece" | "per_box" | "per_cake"> = {
  kg: "per_kg",
  piece: "per_piece",
  box: "per_box",
  cake: "per_cake",
};
