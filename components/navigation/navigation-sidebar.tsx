import { currentProfile } from "@/lib/current-profile";

import NavigationAction from "./navigation-action";
import NavigationItem from "./navigation-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import UserButton from "../user-button";
import { redirect } from "next/navigation";

const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");
  const servers = await db.server.findMany({
    where: { members: { some: { profileId: profile.id } } },
  });

  return (
    <div className="nav-container">
      <NavigationAction />
      <Separator className="h-[2px] bg-foreground/10 rounded w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers?.map((server) => (
          <div key={server.id} className="mb-3">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <UserButton profile={profile} />
      </div>
    </div>
  );
}
export default NavigationSidebar;
