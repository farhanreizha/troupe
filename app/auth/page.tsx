import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "sonner";

import { getSession } from "@/lib/get-session";

import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await getSession();
  if (session) return redirect("/");

  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster position="top-right" />
      <Tabs defaultValue="signup">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignIn />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}
