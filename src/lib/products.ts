import type { Localized } from "./i18n";

import baklavaBox from "@/assets/baklava-box.jpg";
import barazek from "@/assets/barazek-maamoul.jpg";
import basbousa from "@/assets/basbousa.jpg";
import chocolateCake from "@/assets/chocolate-cake.jpg";
import halawet from "@/assets/halawet-el-jibn.jpg";
import kunafa from "@/assets/kunafa.jpg";
import mabroume from "@/assets/mabroume.jpg";
import mafroukeh from "@/assets/mafroukeh.jpg";

export type CategoryId = "cold" | "baklava" | "pastries" | "cookies" | "candy";
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

const categoryImages: Record<CategoryId, string> = {
  cold: halawet,
  baklava: baklavaBox,
  pastries: kunafa,
  cookies: barazek,
  candy: chocolateCake,
};

const categoryDescriptions: Record<CategoryId, Localized> = {
  cold: { nl: "Vers bereid koud dessert uit eigen keuken.", ar: "حلوى باردة محضّرة طازجة في مطبخنا.", en: "Freshly prepared cold dessert from our kitchen." },
  baklava: { nl: "Dagelijks vers bereid volgens traditioneel recept.", ar: "محضّرة يومياً على الطريقة التقليدية.", en: "Prepared fresh daily to a traditional recipe." },
  pastries: { nl: "Vers gebakken Syrische specialiteit.", ar: "حلوى سورية مخبوزة طازجة.", en: "Freshly baked Syrian speciality." },
  cookies: { nl: "Ambachtelijk koekassortiment, vers uit onze bakkerij.", ar: "تشكيلة كعك محضّرة طازجة في مخبزنا.", en: "Handmade cookie selection, fresh from our bakery." },
  candy: { nl: "Rijke zoete specialiteit uit ons winkelassortiment.", ar: "صنف حلو فاخر من تشكيلتنا.", en: "A rich sweet speciality from our shop selection." },
};

function product(
  id: string,
  category: CategoryId,
  names: Localized,
  price: number,
  unit: Unit,
  image = categoryImages[category],
  featured = false,
): Product {
  return { id, category, name: names, description: categoryDescriptions[category], price, unit, image, featured };
}

export const products: Product[] = [
  product("kler", "cold", { nl: "Kler", ar: "كلير", en: "Kler" }, 2, "piece", chocolateCake, true),
  product("cake-piece", "cold", { nl: "Stuk taart", ar: "كاتو قطع", en: "Cake slice" }, 2.5, "piece", chocolateCake),
  product("ras-el-abed", "cold", { nl: "Ras El Abed", ar: "راس العبد", en: "Ras El Abed" }, 1, "piece", chocolateCake),
  product("liliana", "cold", { nl: "Liliana", ar: "ليليانا", en: "Liliana" }, 20, "kg", mafroukeh),
  product("booza", "cold", { nl: "Arabisch ijs", ar: "بوظة", en: "Arabic ice cream" }, 20, "kg", halawet),
  product("esh-el-bulbul", "cold", { nl: "Esh El Bulbul", ar: "عش البلبل", en: "Esh El Bulbul" }, 20, "kg", mabroume),
  product("medium-cake", "cold", { nl: "Middelgrote taart", ar: "قالب كاتو وسط", en: "Medium cake" }, 25, "cake", chocolateCake),
  product("large-cake", "cold", { nl: "Grote taart", ar: "قالب كاتو كبير", en: "Large cake" }, 30, "cake", chocolateCake),
  product("mhalaya", "cold", { nl: "Mhalaya", ar: "محلاية", en: "Mhalaya" }, 2.5, "piece", halawet),
  product("ashta", "cold", { nl: "Ashta-room", ar: "قشطة", en: "Ashta cream" }, 20, "kg", halawet),

  product("classic-mix", "baklava", { nl: "Klassieke mix", ar: "مشكل كلاسيك", en: "Classic mix" }, 35, "kg", baklavaBox, true),
  product("baklava-mix", "baklava", { nl: "Gemengde baklava", ar: "بقلاوة مشكل", en: "Mixed baklava" }, 35, "kg", baklavaBox, true),
  product("half-kilo-mix", "baklava", { nl: "Gemengde doos ½ kilo", ar: "نصف كيلو مشكل", en: "Half-kilo mixed box" }, 35, "box", baklavaBox),
  product("maarouk-ashta", "baklava", { nl: "Maarouk met ashta", ar: "معروك قشطة", en: "Maarouk with ashta" }, 12, "piece", basbousa),
  product("maarouk", "baklava", { nl: "Maarouk", ar: "معروك", en: "Maarouk" }, 8, "piece", basbousa),
  product("kunafa-cheese", "baklava", { nl: "Kunafa met kaas", ar: "كنافة جبن", en: "Cheese kunafa" }, 8, "piece", kunafa),
  product("kunafa-piece", "baklava", { nl: "Stuk kunafa", ar: "قطعة كنافة", en: "Kunafa piece" }, 5, "piece", kunafa),
  product("mabrouma", "baklava", { nl: "Mabrouma", ar: "مبرومة", en: "Mabrouma" }, 40, "kg", mabroume, true),
  product("plain-maarouk", "baklava", { nl: "Naturel maarouk", ar: "معروك سادة", en: "Plain maarouk" }, 5, "piece", basbousa),
  product("swar", "baklava", { nl: "Swar", ar: "سوار", en: "Swar" }, 25, "kg", mabroume),

  product("halawet-el-jibn", "pastries", { nl: "Halawet El Jibn", ar: "حلاوة الجبن", en: "Halawet El Jibn" }, 20, "kg", halawet, true),
  product("faisaliyat-pistachio", "pastries", { nl: "Faisaliyat met pistache", ar: "فصليات وفستق", en: "Faisaliyat with pistachio" }, 4, "piece", mabroume),
  product("awama", "pastries", { nl: "Awama", ar: "عوامة", en: "Awama" }, 15, "kg", basbousa),
  product("nabulsiya", "pastries", { nl: "Nabulsiya", ar: "نابلسية", en: "Nabulsiya" }, 18, "kg", kunafa, true),
  product("qatayef", "pastries", { nl: "Qatayef", ar: "قطايف", en: "Qatayef" }, 15, "kg", kunafa),
  product("harissa", "pastries", { nl: "Harissa", ar: "هريسة", en: "Harissa" }, 18, "kg", basbousa),
  product("pastry-mix", "pastries", { nl: "Gemengde zoetwaren", ar: "مشكل", en: "Mixed sweets" }, 15, "kg", baklavaBox),
  product("madlouka", "pastries", { nl: "Madlouka", ar: "مدلوقة", en: "Madlouka" }, 20, "kg", mafroukeh),
  product("kunafa-ashta", "pastries", { nl: "Kunafa met ashta", ar: "كنافة بالقشطة", en: "Kunafa with ashta" }, 20, "kg", kunafa),
  product("shuaibiyat-ashta", "pastries", { nl: "Shuaibiyat met ashta", ar: "شعيبيات قشطة", en: "Shuaibiyat with ashta" }, 2.5, "piece", halawet),
  product("namoura", "pastries", { nl: "Namoura", ar: "نمورة", en: "Namoura" }, 20, "kg", basbousa),
  product("warbat-ashta", "pastries", { nl: "Warbat met ashta", ar: "وربات بالقشطة", en: "Warbat with ashta" }, 20, "kg", halawet),

  product("ghraybeh", "cookies", { nl: "Ghraybeh", ar: "غريبة", en: "Ghraybeh" }, 20, "kg", barazek),
  product("barazek", "cookies", { nl: "Barazek", ar: "برازق", en: "Barazek" }, 20, "kg", barazek, true),
  product("date-fingers", "cookies", { nl: "Dadelvingers", ar: "أصابع تمر", en: "Date fingers" }, 20, "kg", barazek),
  product("maamoul-walnut", "cookies", { nl: "Maamoul met walnoot", ar: "معمول جوز", en: "Walnut maamoul" }, 22, "kg", barazek),
  product("maamoul-pistachio", "cookies", { nl: "Maamoul met pistache", ar: "معمول فستق", en: "Pistachio maamoul" }, 28, "kg", barazek, true),
  product("maamoul-date", "cookies", { nl: "Maamoul met dadel", ar: "معمول تمر", en: "Date maamoul" }, 20, "kg", barazek),
  product("petit-four-small", "cookies", { nl: "Petit four klein", ar: "بتيفور صب", en: "Small petit four" }, 10, "kg", barazek),
  product("petit-four", "cookies", { nl: "Petit four", ar: "بتيفور", en: "Petit four" }, 15, "kg", barazek),
  product("natif", "cookies", { nl: "Natif", ar: "ناطف", en: "Natif" }, 7, "piece", barazek),

  product("malek-chocolate", "candy", { nl: "Al Malek chocolade", ar: "شوكولا الملك", en: "Al Malek chocolate" }, 25, "kg", chocolateCake, true),
  product("premium-chocolate", "candy", { nl: "Premium chocolade", ar: "شوكولا ممتازة", en: "Premium chocolate" }, 35, "kg", chocolateCake),
  product("chocolate", "candy", { nl: "Chocolade", ar: "شوكولا", en: "Chocolate" }, 20, "kg", chocolateCake),
  product("hospitality-box", "candy", { nl: "Gastendoos", ar: "علب ضيافة", en: "Hospitality box" }, 0.5, "piece", chocolateCake),
  product("almond-harissa", "candy", { nl: "Amandelharissa", ar: "هريسة لوز", en: "Almond harissa" }, 18, "kg", basbousa),
  product("deluxe-chocolate", "candy", { nl: "Deluxe chocolade", ar: "شوكولا ديلوكس", en: "Deluxe chocolate" }, 30, "kg", chocolateCake),
  product("salwa", "candy", { nl: "Salwa", ar: "من السلوى", en: "Salwa" }, 20, "kg", halawet),
  product("mlabas", "candy", { nl: "Mlabas", ar: "ملبس", en: "Mlabas" }, 15, "kg", barazek),
  product("wedding-box", "candy", { nl: "Feestdoos", ar: "علب أفراح", en: "Celebration box" }, 1, "piece", chocolateCake),
  product("nuts-small", "candy", { nl: "Notenmix klein", ar: "مكسرات", en: "Small mixed nuts" }, 8, "piece", mabroume),
  product("nuts", "candy", { nl: "Notenmix", ar: "مكسرات", en: "Mixed nuts" }, 15, "kg", mabroume),
  product("nougat", "candy", { nl: "Nougat", ar: "نوغا", en: "Nougat" }, 20, "kg", halawet),
  product("raha", "candy", { nl: "Raha", ar: "راحة", en: "Raha" }, 24, "kg", halawet),
  product("caramel", "candy", { nl: "Karamel", ar: "كراميل", en: "Caramel" }, 10, "kg", chocolateCake),
];

export const categories: { id: CategoryId; key: "cat_cold" | "cat_baklava" | "cat_pastries" | "cat_cookies" | "cat_candy" }[] = [
  { id: "cold", key: "cat_cold" },
  { id: "baklava", key: "cat_baklava" },
  { id: "pastries", key: "cat_pastries" },
  { id: "cookies", key: "cat_cookies" },
  { id: "candy", key: "cat_candy" },
];

export const unitKey: Record<Unit, "per_kg" | "per_piece" | "per_box" | "per_cake"> = {
  kg: "per_kg",
  piece: "per_piece",
  box: "per_box",
  cake: "per_cake",
};