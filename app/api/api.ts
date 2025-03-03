import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchProfile = async () => {
  try {
    const { data, error } = await supabase.from("profile").select("*");
    if (error) {
      console.error("Error fetching API keys:", error);
      return [];
    }
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
};
