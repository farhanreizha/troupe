import { cookies } from "next/headers";
import createClient from "./supabase/client";
import serverCreateClient from "./supabase/server";

export async function getSession() {
  const supabase = await serverCreateClient(cookies());
  const { data } = await supabase.auth.getSession();
  return data.session;
}
