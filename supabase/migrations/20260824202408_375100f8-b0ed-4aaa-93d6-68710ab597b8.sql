UPDATE public.store_settings SET value = '1234', updated_at = now() WHERE key = 'admin_pin';
INSERT INTO public.store_settings (key, value)
SELECT 'admin_pin', '1234'
WHERE NOT EXISTS (SELECT 1 FROM public.store_settings WHERE key = 'admin_pin');