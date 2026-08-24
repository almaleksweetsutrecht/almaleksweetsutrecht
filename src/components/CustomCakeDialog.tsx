import { useServerFn } from "@tanstack/react-start";
import { CakeSlice, ImagePlus } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

import { createCakeRequest } from "@/lib/shop.functions";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { money, useI18n, type DictKey } from "@/lib/i18n";
import { STORE, whatsappLink } from "@/lib/store-info";

const sizes = [
  { id: "16", label: "16 cm · 6–8", price: 42 },
  { id: "22", label: "22 cm · 10–14", price: 68 },
  { id: "26", label: "26 cm · 18–24", price: 95 },
  { id: "32", label: "32 cm · 30–40", price: 145 },
];
const layerOptions = [1, 2, 3, 4];
const flavours: { id: string; key: DictKey }[] = [
  { id: "pistachio", key: "flavor_pistachio" },
  { id: "chocolate", key: "flavor_chocolate" },
  { id: "lotus", key: "flavor_lotus" },
  { id: "vanilla", key: "flavor_vanilla" },
  { id: "ashta", key: "flavor_ashta" },
];
const occasions: { id: string; key: DictKey }[] = [
  { id: "wedding", key: "wedding" },
  { id: "birthday", key: "birthday" },
  { id: "engagement", key: "engagement" },
  { id: "other", key: "other" },
];

export function CustomCakeDialog({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const sendRequest = useServerFn(createCakeRequest);
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(sizes[1]!.id);
  const [layers, setLayers] = useState(2);
  const [flavour, setFlavour] = useState(flavours[0]!.key);
  const [occasion, setOccasion] = useState(occasions[0]!.key);
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", notes: "" });

  const base = sizes.find((s) => s.id === size)!.price;
  const estimate = base + (layers - 1) * 14;

  const submit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error(t("fill_required"));
      return;
    }
    const message = [
      `*${STORE.name} — ${t("cakes_title")}*`,
      `${t("occasion")}: ${t(occasion)}`,
      `${t("size")}: ${sizes.find((s) => s.id === size)!.label} cm`,
      `${t("layers")}: ${layers}`,
      `${t("flavor")}: ${t(flavour)}`,
      `${t("fulfilment")}: ${mode === "pickup" ? t("pickup") : t("delivery")}`,
      `${t("date")}: ${form.date} ${form.time}`,
      `${t("your_name")}: ${form.name}`,
      `${t("phone")}: ${form.phone}`,
      form.notes ? `${t("notes")}: ${form.notes}` : "",
      photoName ? `${t("reference_photo")}: ${photoName}` : "",
      `${t("est_price")}: ${money(estimate)}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await sendRequest({
        data: {
          customerName: form.name.trim(),
          phone: form.phone.trim(),
          occasion: t(occasion),
          size: sizes.find((s) => s.id === size)!.label,
          layers: String(layers),
          flavour: t(flavour),
          fulfilment: mode,
          wantedDate: form.date,
          wantedTime: form.time,
          notes: [form.notes, photoName ? `Referentiefoto: ${photoName}` : ""]
            .filter(Boolean)
            .join(" · "),
        },
      });
    } catch {
      /* WhatsApp still carries the request */
    }

    window.open(whatsappLink(message), "_blank", "noreferrer");
    toast.success(t("order_sent"));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] gap-5 overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-2xl">
            <CakeSlice className="h-5 w-5 text-gold-deep" />
            {t("cakes_title")}
          </DialogTitle>
          <DialogDescription>{t("cakes_sub")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label>{t("occasion")}</Label>
          <div className="flex flex-wrap gap-2">
            {occasions.map((o) => (
              <Button
                key={o.id}
                size="sm"
                variant={occasion === o.key ? "gold" : "goldOutline"}
                onClick={() => setOccasion(o.key)}
              >
                {t(o.key)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>{t("size")}</Label>
          <div className="grid grid-cols-2 gap-2">
            {sizes.map((s) => (
              <Button
                key={s.id}
                size="sm"
                variant={size === s.id ? "gold" : "goldOutline"}
                className="h-11 whitespace-normal text-xs"
                onClick={() => setSize(s.id)}
              >
                {s.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>{t("layers")}</Label>
          <div className="flex gap-2">
            {layerOptions.map((l) => (
              <Button
                key={l}
                size="icon"
                variant={layers === l ? "gold" : "goldOutline"}
                onClick={() => setLayers(l)}
              >
                {l}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>{t("flavor")}</Label>
          <div className="flex flex-wrap gap-2">
            {flavours.map((f) => (
              <Button
                key={f.id}
                size="sm"
                variant={flavour === f.key ? "gold" : "goldOutline"}
                onClick={() => setFlavour(f.key)}
              >
                {t(f.key)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>{t("reference_photo")}</Label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setPhotoName(file.name);
              setPhoto(URL.createObjectURL(file));
            }}
          />
          <div className="flex items-center gap-3">
            <Button variant="goldOutline" size="sm" onClick={() => fileRef.current?.click()}>
              <ImagePlus />
              {t("reference_photo")}
            </Button>
            {photo && (
              <img
                src={photo}
                alt={photoName}
                width={56}
                height={56}
                className="h-14 w-14 rounded-md border border-gold/40 object-cover"
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground">{t("photo_hint")}</p>
        </div>

        <div className="grid gap-2">
          <Label>{t("fulfilment")}</Label>
          <div className="grid grid-cols-2 gap-2">
            {(["pickup", "delivery"] as const).map((m) => (
              <Button
                key={m}
                size="sm"
                variant={mode === m ? "gold" : "goldOutline"}
                className="h-11 whitespace-normal text-xs"
                onClick={() => setMode(m)}
              >
                {t(m)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label>{t("date")}</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="grid gap-1.5">
            <Label>{t("time")}</Label>
            <Input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
          </div>
          <div className="grid gap-1.5">
            <Label>{t("your_name")}</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label>{t("phone")}</Label>
            <Input
              value={form.phone}
              inputMode="tel"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label>{t("notes")}</Label>
          <Textarea
            rows={3}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-gold/40 bg-secondary px-4 py-3">
          <span className="text-sm uppercase tracking-wide text-muted-foreground">
            {t("est_price")}
          </span>
          <span className="font-display text-2xl text-gold-deep">{money(estimate)}</span>
        </div>

        <Button variant="gold" size="lg" className="w-full" onClick={submit}>
          {t("send_request")}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
