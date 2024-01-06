import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";

export default async function SetupPage() {
  const profile = await currentProfile();
  if (!profile) return redirect("/auth");

  return redirect(`/${profile.username}`);
}
