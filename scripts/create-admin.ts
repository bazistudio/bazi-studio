import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

async function run() {
  console.log("🚀 Starting Super Admin provisioning...");

  // 1. Validation
  if (!supabaseUrl) {
    console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL is missing in environment.");
    process.exit(1);
  }
  if (!supabaseServiceKey) {
    console.error("❌ Error: SUPABASE_SERVICE_ROLE_KEY is missing in environment.");
    process.exit(1);
  }
  if (!adminEmail) {
    console.error("❌ Error: ADMIN_EMAIL is missing in environment.");
    process.exit(1);
  }
  if (!adminPassword) {
    console.error("❌ Error: ADMIN_PASSWORD is missing in environment.");
    process.exit(1);
  }

  // 2. Initialize Supabase Admin client
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    console.log("🔍 Checking for existing user...");
    
    // Page through users to find by email
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers({
      perPage: 1000,
    });

    if (listError) {
      throw new Error(`Failed to list users: ${listError.message}`);
    }

    const existingUser = (users as any[]).find((u) => u.email?.toLowerCase() === adminEmail.toLowerCase());
    let userId: string;

    if (existingUser) {
      console.log(`👤 User found with email: ${adminEmail}. Updating password...`);
      const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        {
          password: adminPassword,
          email_confirm: true,
        }
      );

      if (updateError) {
        throw new Error(`Failed to update user password: ${updateError.message}`);
      }

      userId = updateData.user.id;
      console.log("✅ User password updated successfully.");
    } else {
      console.log(`➕ User not found. Creating new user: ${adminEmail}...`);
      const { data: createData, error: createError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
      });

      if (createError) {
        throw new Error(`Failed to create user: ${createError.message}`);
      }

      userId = createData.user.id;
      console.log("✅ User created successfully.");
    }

    // 3. Ensure the profile exists and has role 'admin'
    console.log("⚙️ Ensuring profile exists with 'admin' role...");
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({ id: userId, role: "admin" }, { onConflict: "id" });

    if (profileError) {
      throw new Error(`Failed to update profile role to admin: ${profileError.message}`);
    }

    console.log("🎉 Super Admin has been successfully provisioned!");
  } catch (error: any) {
    console.error("❌ Provisioning failed:", error.message || error);
    process.exit(1);
  }
}

run();
