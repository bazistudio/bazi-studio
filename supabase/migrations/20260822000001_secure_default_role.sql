-- Alter profiles table to change default role from 'admin' to 'user'
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user';

-- Redefine handle_new_user trigger function to insert 'user' instead of 'admin'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (new.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
