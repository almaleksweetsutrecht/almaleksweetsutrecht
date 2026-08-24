-- Ensure the browser (anon/authenticated) can never touch these sensitive tables
REVOKE ALL ON public.orders FROM anon, authenticated;
REVOKE ALL ON public.cake_requests FROM anon, authenticated;
REVOKE ALL ON public.admin_sessions FROM anon, authenticated;
REVOKE ALL ON public.store_settings FROM anon, authenticated;

-- Trusted server-side code (service role) keeps full access; it bypasses RLS
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.cake_requests TO service_role;
GRANT ALL ON public.admin_sessions TO service_role;
GRANT ALL ON public.store_settings TO service_role;

-- Keep RLS on and force it so even the table owner is subject to policies
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders FORCE ROW LEVEL SECURITY;
ALTER TABLE public.cake_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cake_requests FORCE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions FORCE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings FORCE ROW LEVEL SECURITY;

-- Explicit deny-all policies: documents intent and blocks any client access
DROP POLICY IF EXISTS "No public access to orders" ON public.orders;
CREATE POLICY "No public access to orders" ON public.orders
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "No public access to cake requests" ON public.cake_requests;
CREATE POLICY "No public access to cake requests" ON public.cake_requests
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "No public access to admin sessions" ON public.admin_sessions;
CREATE POLICY "No public access to admin sessions" ON public.admin_sessions
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "No public access to store settings" ON public.store_settings;
CREATE POLICY "No public access to store settings" ON public.store_settings
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);