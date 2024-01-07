import { cookies } from "next/headers";
import { serverCreateClient } from "./supabase/server";

export const getUser = async () => {
  const supabase = await serverCreateClient(cookies());
  const { data } = await supabase.auth.getUser();
  return data.user;
};
