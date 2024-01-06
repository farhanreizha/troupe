"use client";
import { Button } from "@/components/ui/button";
import createClient from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();
  const SignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };
  return <Button onClick={SignOut}>Sign Out</Button>;
}
