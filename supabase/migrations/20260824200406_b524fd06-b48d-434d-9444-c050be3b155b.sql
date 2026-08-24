-- Products
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  name_nl text NOT NULL,
  name_ar text NOT NULL,
  name_en text NOT NULL,
  desc_nl text NOT NULL DEFAULT '',
  desc_ar text NOT NULL DEFAULT '',
  desc_en text NOT NULL DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  unit text NOT NULL DEFAULT 'box',
  image_url text,
  featured boolean NOT NULL DEFAULT false,
  available boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT TO anon, authenticated USING (true);

-- Orders
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference text NOT NULL DEFAULT concat('AM-', to_char(now(), 'YYMMDD'), '-', upper(substr(md5(random()::text), 1, 4))),
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text,
  fulfilment text NOT NULL DEFAULT 'pickup',
  address text,
  payment_method text NOT NULL DEFAULT 'ideal',
  payment_status text NOT NULL DEFAULT 'pending',
  wanted_date date,
  wanted_time text,
  notes text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  delivery_fee numeric(10,2) NOT NULL DEFAULT 0,
  total numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Custom cake requests
CREATE TABLE public.cake_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name text NOT NULL,
  phone text NOT NULL,
  occasion text,
  size text,
  layers text,
  flavour text,
  message_on_cake text,
  fulfilment text NOT NULL DEFAULT 'pickup',
  wanted_date date,
  wanted_time text,
  notes text,
  reference_image_url text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.cake_requests TO service_role;
ALTER TABLE public.cake_requests ENABLE ROW LEVEL SECURITY;

-- Admin sessions (owner PIN login). Service role only.
CREATE TABLE public.admin_sessions (
  token uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '12 hours'
);
GRANT ALL ON public.admin_sessions TO service_role;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Store settings (admin PIN lives here, service-role only)
CREATE TABLE public.store_settings (
  key text NOT NULL PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.store_settings TO service_role;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
INSERT INTO public.store_settings (key, value) VALUES ('admin_pin', '1379');

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER products_touch BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER orders_touch BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER cake_requests_touch BEFORE UPDATE ON public.cake_requests FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.products (slug, category, name_nl, name_ar, name_en, desc_nl, desc_ar, desc_en, price, unit, featured, sort_order) VALUES
('mixed-baklava-box','baklava','Gemengde Syrische Baklava Doos','علبة بقلاوة سورية مشكّلة','Mixed Syrian Baklava Box','Twaalf soorten baklava in één gouden doos: pistache, cashew, walnoot en amandel.','اثنا عشر نوعاً من البقلاوة في علبة ذهبية واحدة: فستق، كاجو، جوز ولوز.','Twelve kinds of baklava in one gold box: pistachio, cashew, walnut and almond.',24.50,'box',true,1),
('kol-w-shkor','baklava','Kol W Shkor (Cashewvingers)','كل وأشكر (أصابع كاجو)','Kol W Shkor (Cashew Fingers)','Knapperige rolletjes filodeeg gevuld met romige cashewpasta.','أصابع مقرمشة من عجين الفيلو محشوة بمعجون الكاجو الكريمي.','Crisp filo fingers filled with creamy cashew paste.',27.00,'kg',true,2),
('mabroume-pistachio','baklava','Mabroume met Pistache','مبرومة بالفستق الحلبي','Mabroume with Pistachio','Gedraaide kadaifi-rollen royaal gevuld met Syrische pistache.','لفائف مبرومة محشوة بسخاء بالفستق الحلبي.','Twisted kadaifi rolls generously filled with Syrian pistachio.',32.00,'kg',true,3),
('warbat-cream','baklava','Warbat met Room','وربات بالقشطة','Warbat with Cream','Vierkantjes bladerdeeg met verse ashta-room en pistache.','مربعات من العجين الرقيق محشوة بالقشطة الطازجة والفستق.','Flaky pastry squares with fresh ashta cream and pistachio.',2.75,'piece',false,4),
('barazek-maamoul-box','baklava','Barazek & Maamoul Doos','علبة برازق ومعمول','Barazek & Maamoul Box','Sesamkoekjes met pistache naast maamoul met dadels en walnoot.','برازق بالسمسم والفستق مع معمول محشو بالتمر والجوز.','Sesame-pistachio barazek beside maamoul with dates and walnut.',18.90,'box',false,5),
('nabulsi-kunafa','syrup','Nabulsi Kunafa (fijn / grof)','كنافة نابلسية (ناعمة / خشنة)','Nabulsi Kunafa (fine / coarse)','Warme kunafa met gesmolten Nabulsi-kaas, siroop en pistache.','كنافة ساخنة بالجبنة النابلسية مع القطر والفستق.','Hot kunafa with melted Nabulsi cheese, syrup and pistachio.',26.50,'kg',true,6),
('basbousa-namoora','syrup','Syrische Basbousa / Namoora met Amandel','بسبوسة / نمورة سورية باللوز','Syrian Basbousa / Namoora with Almonds','Boterzachte griesmeelcake met kokos, amandelen en warme siroop.','كيك السمولينا الطري مع جوز الهند واللوز والقطر الدافئ.','Buttery semolina cake with coconut, almonds and warm syrup.',19.50,'kg',false,7),
('halawet-el-jibn','syrup','Halawet El Jibn','حلاوة الجبن','Halawet El Jibn','Zachte kaasrolletjes gevuld met ashta, rozensiroop en pistache.','لفائف الجبن الطرية محشوة بالقشطة مع شراب الورد والفستق.','Soft cheese rolls filled with ashta, rose syrup and pistachio.',3.20,'piece',false,8),
('mafroukeh-cream','syrup','Mafroukeh met Room','مفروكة بالقشطة','Mafroukeh with Cream','Geroosterde griesmeelbasis met dikke ashta-room en pistaches.','قاعدة سمولينا محمّصة مغطاة بالقشطة والفستق.','Toasted semolina base covered in thick ashta cream and pistachios.',29.50,'kg',false,9),
('pistachio-cream-cake','cakes','Pistache Roomtaart','كيك الفستق بالكريما','Pistachio Cream Cake','Drie biscuitlagen met pistachecrème en mascarpone. 8–10 personen.','ثلاث طبقات مع كريمة الفستق والماسكربوني. تكفي ٨–١٠ أشخاص.','Three sponge layers with pistachio crème and mascarpone. Serves 8–10.',42.00,'cake',true,10),
('royal-chocolate-cake','cakes','Royal Chocolade Laagjestaart','كيك الشوكولا الملكي','Royal Chocolate Layer Cake','Belgische chocoladecake met ganache en gouden accenten. 8–10 personen.','كيك الشوكولا البلجيكية مع الغاناش ولمسات ذهبية. تكفي ٨–١٠ أشخاص.','Belgian chocolate cake with ganache and gold accents. Serves 8–10.',39.50,'cake',false,11);