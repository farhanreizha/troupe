import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";

import NavigationSidebar from "@/components/navigation/navigation-sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await currentProfile();
  if (!profile) return redirect("/");

  return (
    <div className="h-screen">
      <div className="sidebar">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-screen">{children}</main>
    </div>
  );
}
