import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { money, useI18n, type DictKey } from "@/lib/i18n";
import { unitKey } from "@/lib/products";
import { createOrder } from "@/lib/shop.functions";
import { STORE, whatsappLink } from "@/lib/store-info";

type Mode = "pickup" | "delivery";
type Payment = "whatsapp" | "cash";

const payments: { id: Payment; key: DictKey; icon: typeof MessageCircle }[] = [
  { id: "whatsapp", key: "or_whatsapp", icon: MessageCircle },
  { id: "cash", key: "pay_cash", icon: ShoppingBag },
];

export function CartDrawer() {
  const { t, lang } = useI18n();
  const { lines, setQty, remove, subtotal, count, open, setOpen, clear } = useCart();
  const submitOrder = useServerFn(createOrder);
  const [mode, setMode] = useState<Mode>("pickup");
  const [payment, setPayment] = useState<Payment>("whatsapp");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    notes: "",
  });

  const fee =
    mode === "delivery" && subtotal > 0 && subtotal < STORE.freeDeliveryFrom ? STORE.deliveryFee : 0;
  const total = subtotal + fee;


  const valid = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error(t("fill_required"));
      return false;
    }
    return true;
  };

  const persist = async () =>
    submitOrder({
      data: {
        customerName: form.name.trim(),
        phone: form.phone.trim(),
        fulfilment: mode,
        address: mode === "delivery" ? form.address.trim() : "",
        paymentMethod: payment,
        wantedDate: form.date,
        wantedTime: form.time,
        notes: form.notes,
        items: lines.map((l) => ({
          slug: l.id,
          name: l.name.en,
          qty: l.qty,
          price: l.price,
        })),
        subtotal,
        deliveryFee: fee,
        total,
      },
    });

  const checkout = async () => {
    if (!valid()) return;
    setBusy(true);
    try {
      await persist();
      toast.success(t("order_saved"));
      clear();
      setOpen(false);
    } catch {
      toast.error(t("order_failed"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-display text-xl">
            <ShoppingBag className="h-5 w-5 text-gold-deep" />
            {t("cart_title")} {count > 0 && <span className="text-gold-deep">({count})</span>}
          </SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">{t("cart_empty")}</p>
        ) : (
          <div className="flex flex-col gap-4 py-4">
            {lines.map((l) => (
              <div key={l.id} className="flex gap-3 rounded-lg border border-border bg-card p-3">
                <img
                  src={l.image}
                  alt={l.name[lang]}
                  loading="lazy"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm font-semibold leading-tight">{l.name[lang]}</p>
                  <p className="text-xs text-muted-foreground">
                    {money(l.price)} {t(unitKey[l.unit])}
                  </p>
                  <div className="mt-auto flex items-center gap-2">
                    <Button
                      variant="goldOutline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setQty(l.id, l.qty - 1)}
                      aria-label="-"
                    >
                      <Minus />
                    </Button>
                    <span className="w-6 text-center text-sm font-semibold">{l.qty}</span>
                    <Button
                      variant="goldOutline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setQty(l.id, l.qty + 1)}
                      aria-label="+"
                    >
                      <Plus />
                    </Button>
                    <span className="ms-auto font-display text-sm text-gold-deep">
                      {money(l.qty * l.price)}
                    </span>
                    <button
                      onClick={() => remove(l.id)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                      aria-label="remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-2 pt-2">
              {(["pickup", "delivery"] as Mode[]).map((m) => (
                <Button
                  key={m}
                  variant={mode === m ? "gold" : "goldOutline"}
                  size="sm"
                  onClick={() => setMode(m)}
                  className="h-11 whitespace-normal text-xs"
                >
                  {t(m)}
                </Button>
              ))}
            </div>

            <div className="grid gap-2">
              <Label>{t("payment_method")}</Label>
              <div className="grid grid-cols-3 gap-2">
                {payments.map((p) => (
                  <Button
                    key={p.id}
                    variant={payment === p.id ? "gold" : "goldOutline"}
                    size="sm"
                    onClick={() => setPayment(p.id)}
                    className="h-12 flex-col gap-1 whitespace-normal px-1 text-[11px] leading-tight"
                  >
                    <p.icon className="h-4 w-4" />
                    {t(p.key)}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{t("pay_preview")}</p>
            </div>



            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label>{t("your_name")}</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid gap-1.5">
                <Label>{t("phone")}</Label>
                <Input
                  value={form.phone}
                  inputMode="tel"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              {mode === "delivery" && (
                <div className="grid gap-1.5">
                  <Label>{t("address")}</Label>
                  <Input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>
              )}
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
              </div>
              <div className="grid gap-1.5">
                <Label>{t("notes")}</Label>
                <Textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-2 space-y-1.5 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <span>{t("subtotal")}</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("delivery_fee")}</span>
                <span>{mode === "pickup" || fee === 0 ? t("free") : money(fee)}</span>
              </div>
              <div className="flex justify-between font-display text-lg text-gold-deep">
                <span>{t("total")}</span>
                <span>{money(total)}</span>
              </div>
            </div>

            <Button
              variant="gold"
              size="lg"
              className="mt-2 w-full"
              disabled={busy}
              onClick={checkout}
            >
              {t("checkout_now")}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
