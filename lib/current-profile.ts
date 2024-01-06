"use server";
import serverCreateClient from "./supabase/server";
import { cookies } from "next/headers";
import { db } from "./db";

export async function currentProfile() {
  const supabase = await serverCreateClient(cookies());
  const { data } = await supabase.auth.getUser();

  if (!data.user) return null;

  const profile = await db.profile.findUnique({
    where: { userId: data.user.id },
  });

  return profile;
}
