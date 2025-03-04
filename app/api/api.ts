import { createClient } from "@supabase/supabase-js";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  salutation: string;
  createdAt: string;
  home_address: string;
  date_of_birth: string;
  gender: string;
  status: string;
  contact_number: string;
  country: string;
  postal_code: string;
  spouse_first_name: string;
  spouse_last_name: string;
  personal_references: string;
}

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

export const updateProfile = async (profile: Profile) => {
  try {
    const { data, error } = await supabase
      .from("profile")
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        salutation: profile.salutation,
        createdAt: profile.createdAt,
        home_address: profile.home_address,
        date_of_birth: profile.date_of_birth,
        gender: profile.gender,
        status: profile.status,
        contact_number: profile.contact_number,
        country: profile.country,
        postal_code: profile.postal_code,
        spouse_first_name: profile.spouse_first_name,
        spouse_last_name: profile.spouse_last_name,
        personal_references: profile.personal_references,
      })
      .eq("id", profile.id)
      .select();

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
