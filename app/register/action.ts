"use server";

import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

export const registerUser = async ({
  email,
  firstName,
  lastName,
  password,
  passwordConfirm,
}: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}) => {
  const newUserSchema = z
    .object({
      email: z.string().email(),
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
    })
    .and(passwordMatchSchema);

  const newUserValidation = newUserSchema.safeParse({
    email,
    firstName,
    lastName,
    password,
    passwordConfirm,
  });

  if (!newUserValidation.success) {
    return {
      error: true,
      message:
        newUserValidation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  const supabase = createClient();

  // Step 1: Sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  // Step 2: Ensure the user was created successfully
  if (!data.user) {
    return {
      error: true,
      message: "User creation failed",
    };
  }

  // Step 3: Insert the profile with the UID from the newly created user
  const { data: profileData, error: profileError } = await supabase
    .from("profile")
    .insert([
      {
        UID: data.user.id, // Use the UID column instead of user_id
        first_name: firstName,
        last_name: lastName,
      },
    ])
    .select();

  if (profileError) {
    return {
      error: true,
      message: profileError.message,
    };
  }

  // Step 4: Check if the email is already in use
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return {
      error: true,
      message: "Email already in use",
    };
  }

  return {
    success: true,
    message: "Check your email for the confirmation link",
  };
};
