import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KeyRound, LogOut, Plus, RefreshCw, Trash2 } from "lucide-react";
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
} from "@/lib/admin.functions";
import { money } from "@/lib/i18n";

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
  category: "baklava" | "syrup" | "cakes";
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
  category: "baklava",
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
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (pin.trim().length < 3) return;
    setBusy(true);
    try {
      const res = await login({ data: { pin: pin.trim() } });
      if (res.ok && res.token) {
        onAuthed(res.token);
        toast.success("Welkom terug 👑");
      } else {
        toast.error("Onjuiste pincode");
      }
    } catch {
      toast.error("Inloggen mislukt");
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
          <h1 className="font-display text-2xl text-gold-deep">Eigenaar login</h1>
          <p className="arabic text-sm text-muted-foreground">لوحة التحكم الخاصة بصاحب المحل</p>
        </div>
        <div className="mt-6 grid gap-3">
          <Label htmlFor="pin">Pincode</Label>
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
            {busy ? "Controleren…" : "Inloggen"}
          </Button>
          <p className="rounded-md border border-gold/30 bg-gold/10 px-3 py-2 text-center text-xs text-muted-foreground">
            Standaard pincode: <span className="font-bold text-gold-deep">1234</span> — wijzig deze
            na het inloggen bij Instellingen.
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

  const [editing, setEditing] = useState<ProductForm | null>(null);
  const [newPin, setNewPin] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard", token],
    queryFn: () => load({ data: { token } }),
    retry: false,
  });

  useEffect(() => {
    if (error) {
      toast.error("Sessie verlopen — log opnieuw in");
      onSignOut();
    }
  }, [error, onSignOut]);

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-dashboard", token] });

  const orderMutation = useMutation({
    mutationFn: (v: { id: string; status: Status }) => setOrderStatus({ data: { token, ...v } }),
    onSuccess: refresh,
    onError: () => toast.error("Bijwerken mislukt"),
  });
  const cakeMutation = useMutation({
    mutationFn: (v: { id: string; status: Status }) => setCakeStatus({ data: { token, ...v } }),
    onSuccess: refresh,
    onError: () => toast.error("Bijwerken mislukt"),
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
      toast.success("Product opgeslagen");
      setEditing(null);
      refresh();
      qc.invalidateQueries({ queryKey: ["shop-products"] });
    },
    onError: () => toast.error("Opslaan mislukt — check de gegevens"),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct({ data: { token, id } }),
    onSuccess: () => {
      toast.success("Product verwijderd");
      refresh();
      qc.invalidateQueries({ queryKey: ["shop-products"] });
    },
    onError: () => toast.error("Verwijderen mislukt"),
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
          <h1 className="font-display text-3xl text-gold-deep">Owner dashboard</h1>
          <p className="arabic text-sm text-muted-foreground">لوحة التحكم الخاصة بصاحب المحل</p>
        </div>
        <div className="flex gap-2">
          <Button variant="goldOutline" size="sm" onClick={refresh}>
            <RefreshCw />
            Verversen
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
            Uitloggen
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Omzet totaal", value: money(revenue) },
          { label: "Bestellingen", value: String(orders.length) },
          { label: "Open bestellingen", value: String(openOrders) },
          { label: "Taartaanvragen", value: String(cakes.length) },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-gold/30 bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{m.label}</p>
            <p className="mt-1 font-display text-2xl text-gold-deep">{m.value}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="orders" className="mt-8">
        <TabsList>
          <TabsTrigger value="orders">Bestellingen</TabsTrigger>
          <TabsTrigger value="cakes">Taartaanvragen</TabsTrigger>
          <TabsTrigger value="products">Menu</TabsTrigger>
          <TabsTrigger value="settings">Instellingen</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-4 grid gap-3">
          {isLoading && <p className="text-muted-foreground">Laden…</p>}
          {!isLoading && orders.length === 0 && (
            <p className="text-muted-foreground">Nog geen bestellingen.</p>
          )}
          {orders.map((o) => (
            <div key={o.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    {o.reference} · {o.customer_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(o.created_at).toLocaleString("nl-NL")} · {o.phone} ·{" "}
                    {o.fulfilment === "delivery" ? "Bezorging" : "Ophalen"} · {o.payment_method}
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
                    {statusLabel[s]}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="cakes" className="mt-4 grid gap-3">
          {!isLoading && cakes.length === 0 && (
            <p className="text-muted-foreground">Nog geen taartaanvragen.</p>
          )}
          {cakes.map((c) => (
            <div key={c.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">
                  {c.customer_name} · {c.phone}
                </p>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.created_at).toLocaleString("nl-NL")}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {[c.occasion, c.size, c.layers ? `${c.layers} lagen` : "", c.flavour]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <p className="text-sm text-muted-foreground">
                {c.fulfilment === "delivery" ? "Bezorging" : "Ophalen"} · {c.wanted_date ?? ""}{" "}
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
                    {statusLabel[s]}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <Button variant="gold" size="sm" onClick={() => setEditing({ ...emptyProduct })}>
            <Plus />
            Nieuw product
          </Button>

          {editing && (
            <div className="mt-4 grid gap-3 rounded-xl border border-gold/40 bg-card p-4 sm:grid-cols-2">
              {(
                [
                  ["slug", "Slug (url-naam)"],
                  ["name_nl", "Naam NL"],
                  ["name_ar", "Naam AR"],
                  ["name_en", "Naam EN"],
                  ["price", "Prijs (€)"],
                  ["sort_order", "Sortering"],
                  ["image_url", "Afbeelding URL (optioneel)"],
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
              <div className="grid gap-1.5">
                <Label>Categorie</Label>
                <select
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value as ProductForm["category"] })
                  }
                >
                  <option value="baklava">Baklava & droge koek</option>
                  <option value="syrup">Warme & siroopdesserts</option>
                  <option value="cakes">Taarten</option>
                </select>
              </div>
              <div className="grid gap-1.5">
                <Label>Eenheid</Label>
                <select
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                  value={editing.unit}
                  onChange={(e) =>
                    setEditing({ ...editing, unit: e.target.value as ProductForm["unit"] })
                  }
                >
                  <option value="kg">per kg</option>
                  <option value="piece">per stuk</option>
                  <option value="box">per doos</option>
                  <option value="cake">per taart</option>
                </select>
              </div>
              {(
                [
                  ["desc_nl", "Beschrijving NL"],
                  ["desc_ar", "Beschrijving AR"],
                  ["desc_en", "Beschrijving EN"],
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
                  Op voorraad
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  />
                  Uitgelicht
                </label>
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <Button
                  variant="gold"
                  onClick={() => productMutation.mutate(editing)}
                  disabled={productMutation.isPending}
                >
                  Opslaan
                </Button>
                <Button variant="goldOutline" onClick={() => setEditing(null)}>
                  Annuleren
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
                <div>
                  <p className="font-semibold">{p.name_nl}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.slug} · {p.category} · {money(Number(p.price))} ·{" "}
                    {p.available ? "op voorraad" : "uitverkocht"}
                  </p>
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
                    {p.available ? "Uitverkocht" : "Op voorraad"}
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
                    Bewerken
                  </Button>
                  <Button
                    size="icon"
                    variant="goldOutline"
                    aria-label="verwijderen"
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
          <Label>Nieuwe pincode</Label>
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
                toast.success("Pincode gewijzigd");
              } catch {
                toast.error("Pincode wijzigen mislukt (min. 4 cijfers)");
              }
            }}
          >
            Pincode opslaan
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const statusLabel: Record<Status, string> = {
  new: "Nieuw",
  preparing: "In bereiding",
  ready: "Klaar",
  delivered: "Bezorgd",
};
