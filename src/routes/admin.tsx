import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, ImageOff, KeyRound, LogOut, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  adminChangePin,
  adminDashboard,
  adminDeleteProduct,
  adminLogin,
  adminLogout,
  adminSaveProduct,
  adminSetCakeStatus,
  adminSetOrderStatus,
  adminUploadImage,
} from "@/lib/admin.functions";
import { fallbackImage, imageBySlug } from "@/lib/shop";
import { money, useI18n, type Lang } from "@/lib/i18n";

type Tx = (nl: string, ar: string, en: string) => string;
function useTx(): Tx {
  const { lang } = useI18n();
  return (nl, ar, en) => ({ nl, ar, en })[lang];
}

const langOptions: { code: Lang; label: string }[] = [
  { code: "ar", label: "العربية" },
  { code: "nl", label: "NL" },
  { code: "en", label: "EN" },
];

function AdminLangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex gap-1">
      {langOptions.map((l) => (
        <Button
          key={l.code}
          size="sm"
          variant={lang === l.code ? "gold" : "goldOutline"}
          onClick={() => setLang(l.code)}
          className={l.code === "ar" ? "arabic" : ""}
        >
          {l.label}
        </Button>
      ))}
    </div>
  );
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Owner dashboard — Al Malek Sweets" },
      {
        name: "description",
        content:
          "Beveiligd dashboard voor Al Malek Sweets: bestellingen, taartaanvragen, prijzen en voorraad beheren.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Owner dashboard — Al Malek Sweets" },
      { property: "og:description", content: "Beheer bestellingen, taartaanvragen en het menu." },
    ],
  }),
  component: AdminPage,
});

const KEY = "almalek-admin-token";
const statuses = ["new", "preparing", "ready", "delivered"] as const;
type Status = (typeof statuses)[number];

type OrderItem = { name: string; qty: number; price: number };

type OrderRow = {
  id: string;
  reference: string;
  customer_name: string;
  phone: string;
  fulfilment: string;
  address: string | null;
  payment_method: string;
  wanted_date: string | null;
  wanted_time: string | null;
  notes: string | null;
  items: OrderItem[];
  total: number | string;
  status: string;
  created_at: string;
};

type CakeRow = {
  id: string;
  customer_name: string;
  phone: string;
  occasion: string | null;
  size: string | null;
  layers: string | null;
  flavour: string | null;
  fulfilment: string;
  wanted_date: string | null;
  wanted_time: string | null;
  notes: string | null;
  status: string;
  created_at: string;
};

type AdminProductRow = {
  id: string;
  slug: string;
  category: ProductForm["category"];
  name_nl: string;
  name_ar: string;
  name_en: string;
  desc_nl: string;
  desc_ar: string;
  desc_en: string;
  price: number | string;
  unit: ProductForm["unit"];
  image_url: string | null;
  featured: boolean;
  available: boolean;
  sort_order: number;
};

type ProductForm = {
  id?: string;
  slug: string;
  category: "cold" | "baklava" | "pastries" | "cookies" | "candy";
  name_nl: string;
  name_ar: string;
  name_en: string;
  desc_nl: string;
  desc_ar: string;
  desc_en: string;
  price: string;
  unit: "kg" | "piece" | "box" | "cake";
  image_url: string;
  featured: boolean;
  available: boolean;
  sort_order: string;
};

const emptyProduct: ProductForm = {
  slug: "",
  category: "cold",
  name_nl: "",
  name_ar: "",
  name_en: "",
  desc_nl: "",
  desc_ar: "",
  desc_en: "",
  price: "0",
  unit: "box",
  image_url: "",
  featured: false,
  available: true,
  sort_order: "50",
};

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToken(window.localStorage.getItem(KEY));
    setReady(true);
  }, []);

  const save = (t: string | null) => {
    setToken(t);
    if (t) window.localStorage.setItem(KEY, t);
    else window.localStorage.removeItem(KEY);
  };

  if (!ready) return <div className="min-h-[60vh]" />;
  if (!token) return <PinGate onAuthed={save} />;
  return <Dashboard token={token} onSignOut={() => save(null)} />;
}

function PinGate({ onAuthed }: { onAuthed: (token: string) => void }) {
  const login = useServerFn(adminLogin);
  const tx = useTx();
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (pin.trim().length < 3) return;
    setBusy(true);
    try {
      const res = await login({ data: { pin: pin.trim() } });
      if (res.ok && res.token) {
        onAuthed(res.token);
        toast.success(tx("Welkom terug 👑", "أهلاً بعودتك 👑", "Welcome back 👑"));
      } else {
        toast.error(tx("Onjuiste pincode", "رمز PIN غير صحيح", "Wrong PIN"));
      }
    } catch {
      toast.error(tx("Inloggen mislukt", "فشل تسجيل الدخول", "Login failed"));
    } finally {
      setBusy(false);
      setPin("");
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-royal-gradient px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gold/30 bg-card p-8 shadow-xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-royal-deep">
            <KeyRound className="h-6 w-6" />
          </span>
          <h1 className="font-display text-2xl text-gold-deep">
            {tx("Eigenaar login", "دخول صاحب المحل", "Owner login")}
          </h1>
          <AdminLangSwitch />
        </div>
        <div className="mt-6 grid gap-3">
          <Label htmlFor="pin">{tx("Pincode", "رمز PIN", "PIN code")}</Label>
          <Input
            id="pin"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="text-center text-2xl tracking-[0.5em]"
          />
          <Button variant="gold" size="lg" disabled={busy} onClick={submit}>
            {busy ? tx("Controleren…", "جارٍ التحقق…", "Checking…") : tx("Inloggen", "دخول", "Log in")}
          </Button>
          <p className="rounded-md border border-gold/30 bg-gold/10 px-3 py-2 text-center text-xs text-muted-foreground">
            {tx("Standaard pincode:", "رمز PIN الافتراضي:", "Default PIN:")}{" "}
            <span className="font-bold text-gold-deep">1234</span> —{" "}
            {tx(
              "wijzig deze na het inloggen bij Instellingen.",
              "غيّره بعد الدخول من الإعدادات.",
              "change it after logging in under Settings.",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ token, onSignOut }: { token: string; onSignOut: () => void }) {
  const qc = useQueryClient();
  const load = useServerFn(adminDashboard);
  const setOrderStatus = useServerFn(adminSetOrderStatus);
  const setCakeStatus = useServerFn(adminSetCakeStatus);
  const saveProduct = useServerFn(adminSaveProduct);
  const deleteProduct = useServerFn(adminDeleteProduct);
  const changePin = useServerFn(adminChangePin);
  const tx = useTx();
  const { lang } = useI18n();
  const locale = lang === "ar" ? "ar" : lang === "en" ? "en-GB" : "nl-NL";

  const [editing, setEditing] = useState<ProductForm | null>(null);
  const [newPin, setNewPin] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard", token],
    queryFn: () => load({ data: { token } }),
    retry: false,
  });

  useEffect(() => {
    if (error) {
      toast.error(tx("Sessie verlopen — log opnieuw in", "انتهت الجلسة — سجّل الدخول مجدداً", "Session expired — log in again"));
      onSignOut();
    }
  }, [error, onSignOut]);

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-dashboard", token] });

  const orderMutation = useMutation({
    mutationFn: (v: { id: string; status: Status }) => setOrderStatus({ data: { token, ...v } }),
    onSuccess: refresh,
    onError: () => toast.error(tx("Bijwerken mislukt", "فشل التحديث", "Update failed")),
  });
  const cakeMutation = useMutation({
    mutationFn: (v: { id: string; status: Status }) => setCakeStatus({ data: { token, ...v } }),
    onSuccess: refresh,
    onError: () => toast.error(tx("Bijwerken mislukt", "فشل التحديث", "Update failed")),
  });
  const productMutation = useMutation({
    mutationFn: (v: ProductForm) =>
      saveProduct({
        data: {
          token,
          ...(v.id ? { id: v.id } : {}),
          slug: v.slug,
          category: v.category,
          name_nl: v.name_nl,
          name_ar: v.name_ar,
          name_en: v.name_en,
          desc_nl: v.desc_nl,
          desc_ar: v.desc_ar,
          desc_en: v.desc_en,
          price: Number(v.price) || 0,
          unit: v.unit,
          image_url: v.image_url,
          featured: v.featured,
          available: v.available,
          sort_order: Number(v.sort_order) || 0,
        },
      }),
    onSuccess: () => {
      toast.success(tx("Product opgeslagen", "تم حفظ الصنف", "Product saved"));
      setEditing(null);
      refresh();
      qc.invalidateQueries({ queryKey: ["shop-products"] });
    },
    onError: () => toast.error(tx("Opslaan mislukt — check de gegevens", "فشل الحفظ — تحقق من البيانات", "Save failed — check the details")),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct({ data: { token, id } }),
    onSuccess: () => {
      toast.success(tx("Product verwijderd", "تم حذف الصنف", "Product deleted"));
      refresh();
      qc.invalidateQueries({ queryKey: ["shop-products"] });
    },
    onError: () => toast.error(tx("Verwijderen mislukt", "فشل الحذف", "Delete failed")),
  });

  const orders = (data?.orders ?? []) as unknown as OrderRow[];
  const cakes = (data?.cakeRequests ?? []) as unknown as CakeRow[];
  const products = (data?.products ?? []) as unknown as AdminProductRow[];

  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + Number(o.total), 0);
  const openOrders = orders.filter((o) => o.status === "new" || o.status === "preparing").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-gold-deep">
            {tx("Eigenaarsdashboard", "لوحة تحكم صاحب المحل", "Owner dashboard")}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <AdminLangSwitch />
          <Button variant="goldOutline" size="sm" onClick={refresh}>
            <RefreshCw />
            {tx("Verversen", "تحديث", "Refresh")}
          </Button>
          <Button
            variant="goldOutline"
            size="sm"
            onClick={async () => {
              await adminLogout({ data: { token } }).catch(() => undefined);
              onSignOut();
            }}
          >
            <LogOut />
            {tx("Uitloggen", "خروج", "Log out")}
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: tx("Omzet totaal", "إجمالي المبيعات", "Total revenue"), value: money(revenue) },
          { label: tx("Bestellingen", "الطلبات", "Orders"), value: String(orders.length) },
          { label: tx("Open bestellingen", "طلبات مفتوحة", "Open orders"), value: String(openOrders) },
          { label: tx("Taartaanvragen", "طلبات الكيك", "Cake requests"), value: String(cakes.length) },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-gold/30 bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{m.label}</p>
            <p className="mt-1 font-display text-2xl text-gold-deep">{m.value}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="orders" className="mt-8">
        <TabsList>
          <TabsTrigger value="orders">{tx("Bestellingen", "الطلبات", "Orders")}</TabsTrigger>
          <TabsTrigger value="cakes">{tx("Taartaanvragen", "طلبات الكيك", "Cake requests")}</TabsTrigger>
          <TabsTrigger value="products">{tx("Menu", "القائمة", "Menu")}</TabsTrigger>
          <TabsTrigger value="settings">{tx("Instellingen", "الإعدادات", "Settings")}</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-4 grid gap-3">
          {isLoading && <p className="text-muted-foreground">{tx("Laden…", "جارٍ التحميل…", "Loading…")}</p>}
          {!isLoading && orders.length === 0 && (
            <p className="text-muted-foreground">{tx("Nog geen bestellingen.", "لا توجد طلبات بعد.", "No orders yet.")}</p>
          )}
          {orders.map((o) => (
            <div key={o.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    {o.reference} · {o.customer_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(o.created_at).toLocaleString(locale)} · {o.phone} ·{" "}
                    {o.fulfilment === "delivery" ? tx("Bezorging", "توصيل", "Delivery") : tx("Ophalen", "استلام", "Pickup")} · {o.payment_method}
                  </p>
                </div>
                <span className="font-display text-lg text-gold-deep">{money(Number(o.total))}</span>
              </div>
              <ul className="mt-2 text-sm text-muted-foreground">
                {(o.items as { name: string; qty: number; price: number }[]).map((it, i) => (
                  <li key={i}>
                    {it.qty} × {it.name} — {money(it.qty * it.price)}
                  </li>
                ))}
              </ul>
              {o.address && <p className="mt-1 text-sm">{o.address}</p>}
              {(o.wanted_date || o.notes) && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {o.wanted_date ?? ""} {o.wanted_time ?? ""} {o.notes ? `· ${o.notes}` : ""}
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={o.status === s ? "gold" : "goldOutline"}
                    onClick={() => orderMutation.mutate({ id: o.id, status: s })}
                  >
                    {tx(...statusLabel[s])}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="cakes" className="mt-4 grid gap-3">
          {!isLoading && cakes.length === 0 && (
            <p className="text-muted-foreground">{tx("Nog geen taartaanvragen.", "لا توجد طلبات كيك بعد.", "No cake requests yet.")}</p>
          )}
          {cakes.map((c) => (
            <div key={c.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">
                  {c.customer_name} · {c.phone}
                </p>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.created_at).toLocaleString(locale)}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {[c.occasion, c.size, c.layers ? `${c.layers} ${tx("lagen", "طبقات", "layers")}` : "", c.flavour]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <p className="text-sm text-muted-foreground">
                {c.fulfilment === "delivery" ? tx("Bezorging", "توصيل", "Delivery") : tx("Ophalen", "استلام", "Pickup")} · {c.wanted_date ?? ""}{" "}
                {c.wanted_time ?? ""}
              </p>
              {c.notes && <p className="mt-1 text-sm">{c.notes}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={c.status === s ? "gold" : "goldOutline"}
                    onClick={() => cakeMutation.mutate({ id: c.id, status: s })}
                  >
                    {tx(...statusLabel[s])}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <Button variant="gold" size="sm" onClick={() => setEditing({ ...emptyProduct })}>
            <Plus />
            {tx("Nieuw product", "صنف جديد", "New product")}
          </Button>

          {editing && (
            <div className="mt-4 grid gap-3 rounded-xl border border-gold/40 bg-card p-4 sm:grid-cols-2">
              {(
                [
                  ["slug", tx("Slug (url-naam)", "المعرّف (رابط)", "Slug (url name)")],
                  ["name_nl", tx("Naam NL", "الاسم بالهولندية", "Name NL")],
                  ["name_ar", tx("Naam AR", "الاسم بالعربية", "Name AR")],
                  ["name_en", tx("Naam EN", "الاسم بالإنجليزية", "Name EN")],
                  ["price", tx("Prijs (€)", "السعر (€)", "Price (€)")],
                  ["sort_order", tx("Sortering", "الترتيب", "Sort order")],
                ] as [keyof ProductForm, string][]
              ).map(([field, label]) => (
                <div key={field} className="grid gap-1.5">
                  <Label>{label}</Label>
                  <Input
                    value={String(editing[field] ?? "")}
                    onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                  />
                </div>
              ))}
              <PhotoPicker
                token={token}
                slug={editing.slug}
                value={editing.image_url}
                onChange={(url) => setEditing((e) => (e ? { ...e, image_url: url } : e))}
              />
              <div className="grid gap-1.5">
                <Label>{tx("Categorie", "الفئة", "Category")}</Label>
                <select
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value as ProductForm["category"] })
                  }
                >
                  {(Object.keys(catLabel) as ProductForm["category"][]).map((c) => (
                    <option key={c} value={c}>
                      {tx(...catLabel[c])}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1.5">
                <Label>{tx("Eenheid", "الوحدة", "Unit")}</Label>
                <select
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                  value={editing.unit}
                  onChange={(e) =>
                    setEditing({ ...editing, unit: e.target.value as ProductForm["unit"] })
                  }
                >
                  <option value="kg">{tx("per kg", "للكيلو", "per kg")}</option>
                  <option value="piece">{tx("per stuk", "للقطعة", "per piece")}</option>
                  <option value="box">{tx("per doos", "للعلبة", "per box")}</option>
                  <option value="cake">{tx("per taart", "للقالب", "per cake")}</option>
                </select>
              </div>
              {(
                [
                  ["desc_nl", tx("Beschrijving NL", "الوصف بالهولندية", "Description NL")],
                  ["desc_ar", tx("Beschrijving AR", "الوصف بالعربية", "Description AR")],
                  ["desc_en", tx("Beschrijving EN", "الوصف بالإنجليزية", "Description EN")],
                ] as [keyof ProductForm, string][]
              ).map(([field, label]) => (
                <div key={field} className="grid gap-1.5 sm:col-span-2">
                  <Label>{label}</Label>
                  <Textarea
                    rows={2}
                    value={String(editing[field] ?? "")}
                    onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                  />
                </div>
              ))}
              <div className="flex items-center gap-4 sm:col-span-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editing.available}
                    onChange={(e) => setEditing({ ...editing, available: e.target.checked })}
                  />
                  {tx("Op voorraad", "متوفر", "In stock")}
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  />
                  {tx("Uitgelicht", "مميّز", "Featured")}
                </label>
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <Button
                  variant="gold"
                  onClick={() => productMutation.mutate(editing)}
                  disabled={productMutation.isPending}
                >
                  {tx("Opslaan", "حفظ", "Save")}
                </Button>
                <Button variant="goldOutline" onClick={() => setEditing(null)}>
                  {tx("Annuleren", "إلغاء", "Cancel")}
                </Button>
              </div>
            </div>
          )}

          <div className="mt-4 grid gap-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.image_url || imageBySlug[p.slug] || fallbackImage}
                    alt=""
                    className="h-14 w-14 rounded-lg object-cover border border-gold/30"
                  />
                  <div>
                  <p className="font-semibold">{lang === "ar" ? p.name_ar : lang === "en" ? p.name_en : p.name_nl}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.slug} · {tx(...catLabel[p.category])} · {money(Number(p.price))} ·{" "}
                    {p.available ? tx("op voorraad", "متوفر", "in stock") : tx("uitverkocht", "نفد", "sold out")}
                  </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={p.available ? "goldOutline" : "gold"}
                    onClick={() =>
                      productMutation.mutate({
                        id: p.id,
                        slug: p.slug,
                        category: p.category,
                        name_nl: p.name_nl,
                        name_ar: p.name_ar,
                        name_en: p.name_en,
                        desc_nl: p.desc_nl,
                        desc_ar: p.desc_ar,
                        desc_en: p.desc_en,
                        price: String(p.price),
                        unit: p.unit,
                        image_url: p.image_url ?? "",
                        featured: p.featured,
                        available: !p.available,
                        sort_order: String(p.sort_order),
                      })
                    }
                  >
                    {p.available ? tx("Uitverkocht", "نفد", "Sold out") : tx("Op voorraad", "متوفر", "In stock")}
                  </Button>
                  <Button
                    size="sm"
                    variant="goldOutline"
                    onClick={() =>
                      setEditing({
                        id: p.id,
                        slug: p.slug,
                        category: p.category,
                        name_nl: p.name_nl,
                        name_ar: p.name_ar,
                        name_en: p.name_en,
                        desc_nl: p.desc_nl,
                        desc_ar: p.desc_ar,
                        desc_en: p.desc_en,
                        price: String(p.price),
                        unit: p.unit,
                        image_url: p.image_url ?? "",
                        featured: p.featured,
                        available: p.available,
                        sort_order: String(p.sort_order),
                      })
                    }
                  >
                    {tx("Bewerken", "تعديل", "Edit")}
                  </Button>
                  <Button
                    size="icon"
                    variant="goldOutline"
                    aria-label={tx("verwijderen", "حذف", "delete")}
                    onClick={() => deleteMutation.mutate(p.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-4 max-w-sm grid gap-3">
          <Label>{tx("Nieuwe pincode", "رمز PIN جديد", "New PIN")}</Label>
          <Input
            type="password"
            inputMode="numeric"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
          />
          <Button
            variant="gold"
            onClick={async () => {
              try {
                await changePin({ data: { token, pin: newPin.trim() } });
                setNewPin("");
                toast.success(tx("Pincode gewijzigd", "تم تغيير رمز PIN", "PIN changed"));
              } catch {
                toast.error(tx("Pincode wijzigen mislukt (min. 4 cijfers)", "فشل تغيير الرمز (4 أرقام على الأقل)", "Changing PIN failed (min. 4 digits)"));
              }
            }}
          >
            {tx("Pincode opslaan", "حفظ الرمز", "Save PIN")}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const statusLabel: Record<Status, [string, string, string]> = {
  new: ["Nieuw", "جديد", "New"],
  preparing: ["In bereiding", "قيد التحضير", "Preparing"],
  ready: ["Klaar", "جاهز", "Ready"],
  delivered: ["Opgehaald", "تم الاستلام", "Collected"],
};

const catLabel: Record<ProductForm["category"], [string, string, string]> = {
  cold: ["Koelgebak", "حلويات باردة", "Cold desserts"],
  baklava: ["Baklava", "بقلاوة", "Baklava"],
  pastries: ["Gebak", "حلويات عربية", "Pastries"],
  cookies: ["Koekjes", "كعك ومعمول", "Cookies"],
  candy: ["Snoep & specialiteiten", "سكاكر وتخصصات", "Sweets & specialities"],
};

async function compressImage(file: File): Promise<string> {
  const bmp = await createImageBitmap(file);
  const max = 1400;
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
  return dataUrl.split(",")[1] ?? "";
}

function PhotoPicker({
  token,
  slug,
  value,
  onChange,
}: {
  token: string;
  slug: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const upload = useServerFn(adminUploadImage);
  const tx = useTx();
  const [busy, setBusy] = useState(false);
  const preview = value || imageBySlug[slug] || fallbackImage;

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const base64 = await compressImage(file);
      const res = await upload({ data: { token, base64, contentType: "image/jpeg" } });
      onChange(res.url);
      toast.success(tx("Foto geüpload — klik Opslaan", "تم رفع الصورة — اضغط حفظ", "Photo uploaded — click Save"));
    } catch {
      toast.error(tx("Foto uploaden mislukt", "فشل رفع الصورة", "Photo upload failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-2 sm:col-span-2">
      <Label>{tx("Foto", "الصورة", "Photo")}</Label>
      <div className="flex flex-wrap items-center gap-3">
        <img
          src={preview}
          alt=""
          className="h-24 w-24 rounded-lg object-cover border border-gold/40"
        />
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gold/60 px-3 py-2 text-sm text-gold">
          <Camera className="h-4 w-4" />
          {busy ? tx("Uploaden...", "جارٍ الرفع...", "Uploading...") : value ? tx("Foto wijzigen", "تغيير الصورة", "Change photo") : tx("Foto toevoegen", "إضافة صورة", "Add photo")}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={busy}
            onChange={(e) => {
              void onFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </label>
        {value && (
          <Button type="button" size="sm" variant="goldOutline" onClick={() => onChange("")}>
            <ImageOff />
            {tx("Foto verwijderen", "حذف الصورة", "Remove photo")}
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        {tx("Kies een foto van je telefoon of maak er direct een. Zonder eigen foto wordt de standaardfoto getoond.", "اختر صورة من هاتفك أو التقط واحدة الآن. بدون صورة خاصة تظهر الصورة الافتراضية.", "Pick a photo from your phone or take one now. Without your own photo the default is shown.")}
      </p>
    </div>
  );
}
