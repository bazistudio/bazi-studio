"use server";

import { createClient } from "@/lib/database/server";
import { revalidatePath } from "next/cache";

export async function loginAdmin(values: { email: string; password: string }) {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email.trim(),
    password: values.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.user) {
    throw new Error("Authentication failed.");
  }

  // Check admin role in profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    await supabase.auth.signOut();
    throw new Error("Unauthorized: Administrator privileges required.");
  }

  revalidatePath("/", "layout");
  return { success: true, userId: data.user.id };
}

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

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
}
