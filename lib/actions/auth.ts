"use server";

import { createClient } from "@/lib/database/server";

// Auth actions are currently handled by Supabase Auth UI / Client
// Additional server-side auth validation can go here if needed.
export async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return profile?.role === "admin";
}
