import { cookies } from "next/headers";
import { serverCreateClient } from "./supabase/server";

export const getSession = async () => {
  const supabase = await serverCreateClient(cookies());
  const { data } = await supabase.auth.getSession();
  return data.session;
};
