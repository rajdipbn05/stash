"use server";

import { isAuthSessionMissingError } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type FormState = {
  error?: string;
  message?: string;
  email?: string;
};

const MIN_PASSWORD_LENGTH = 8;

function readEmail(formData: FormData) {
  return String(formData.get("email") ?? "").trim();
}

function readPassword(formData: FormData, name = "password") {
  return String(formData.get(name) ?? "");
}

// Where links in Supabase's emails send the user back to on our site.
// Uses the address the form was sent from, so it works locally and live.
// The address must be listed under Redirect URLs in Supabase.
async function emailLinkTarget(next: string) {
  const origin = (await headers()).get("origin");
  return `${origin}/auth/confirm?next=${encodeURIComponent(next)}`;
}

export async function signUp(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = readEmail(formData);
  const password = readPassword(formData);

  if (!email) return { error: "Please enter your email.", email };
  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      error: `Your password needs at least ${MIN_PASSWORD_LENGTH} characters.`,
      email,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: await emailLinkTarget("/dashboard") },
  });
  if (error) return { error: error.message, email };

  // If email confirmation is turned off in Supabase, the user is logged in straight away.
  if (data.session) redirect("/dashboard");

  return {
    message: `Almost done! We sent a confirmation link to ${email}. Click it to finish signing up.`,
  };
}

export async function logIn(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = readEmail(formData);
  const password = readPassword(formData);

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.code === "invalid_credentials") {
      return { error: "Wrong email or password.", email };
    }
    if (error.code === "email_not_confirmed") {
      return {
        error: "Please confirm your email first. Check your inbox for the link.",
        email,
      };
    }
    return { error: error.message, email };
  }

  redirect("/dashboard");
}

export async function logOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function requestPasswordReset(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = readEmail(formData);
  if (!email) return { error: "Please enter your email." };

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: await emailLinkTarget("/reset-password"),
  });

  if (error?.code === "over_email_send_rate_limit") {
    return {
      error: "Too many emails sent. Please wait a few minutes and try again.",
      email,
    };
  }

  // Same reply whether or not the account exists, so nobody can use this
  // form to find out who has signed up.
  return {
    message: `If an account exists for ${email}, we sent a link to reset your password.`,
  };
}

export async function updatePassword(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const password = readPassword(formData);
  const confirm = readPassword(formData, "confirm");

  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      error: `Your password needs at least ${MIN_PASSWORD_LENGTH} characters.`,
    };
  }
  if (password !== confirm) return { error: "The two passwords don't match." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    if (error.code === "same_password") {
      return { error: "Please choose a different password from your old one." };
    }
    if (isAuthSessionMissingError(error)) {
      return {
        error: "Your reset link has expired. Please request a new one.",
      };
    }
    return { error: error.message };
  }

  redirect("/dashboard");
}
