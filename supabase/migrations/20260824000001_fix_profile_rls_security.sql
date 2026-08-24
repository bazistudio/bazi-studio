-- ============================================================================
-- Migration: 20260824000001_fix_profile_rls_security.sql
-- Description: Hardens profiles table against privilege escalation.
--              Ensures standard authenticated users cannot modify their 'role' column.
-- ============================================================================

-- 1. Helper to safely detect service-role context in Supabase
CREATE OR REPLACE FUNCTION public.is_service_role()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN COALESCE(
    auth.jwt() ->> 'role' = 'service_role',
    current_setting('request.jwt.claim.role', true) = 'service_role',
    false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger function to protect role column from unauthorized updates
CREATE OR REPLACE FUNCTION public.protect_profile_role()
RETURNS TRIGGER AS $$
BEGIN
  -- If the role is being altered
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    -- Only allow if executed via Supabase service_role key or by an existing confirmed admin
    IF NOT public.is_service_role() AND NOT public.is_admin() THEN
      RAISE EXCEPTION 'Access Denied: You cannot modify your account role.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach trigger to profiles table
DROP TRIGGER IF EXISTS protect_profile_role_trigger ON public.profiles;
CREATE TRIGGER protect_profile_role_trigger
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE PROCEDURE public.protect_profile_role();

-- 4. Re-enforce explicit RLS update policy for authenticated users
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
