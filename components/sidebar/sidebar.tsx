import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  type: "profile" | "server";
  serverId?: string;
  profileId?: string;
}
export default async function Sidebar({
  type,
  serverId,
  profileId,
}: SidebarProps) {
  const profile = await db.profile.findFirst({ where: { id: profileId } });
  if (!profile) return redirect("/");

  const server = await db.server.findFirst({
    where: { id: serverId },
    include: {
      channels: { orderBy: { createdAt: "asc" } },
      members: { include: { profile: true }, orderBy: { role: "asc" } },
    },
  });

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO,
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id,
  );

  const role = server?.members.find((member) => member.profileId === profile.id)
    ?.role;

  return (
    <div className="sidebar_container">
      {type === "profile" && <div>Sidebar Profile</div>}
      {type === "server" && (
        <>
          <div>Server header</div>
          <ScrollArea className="flex-1 px-3 space-y-2">
            <div className="mt-2">Server search</div>
            <Separator className="h-[2px] bg-foreground/10 rounded-md my-2 mx-auto" />
            {!!textChannels?.length && (
              <div className="py-2 space-y-2">
                <div>Server section</div>
                {/* <ServerSection */}
                {/*   sectionType="channels" */}
                {/*   channelType={ChannelType.TEXT} */}
                {/*   role={role} */}
                {/*   label="Text Channels" */}
                {/* /> */}
                <div className="space-y-1">
                  {textChannels?.map((channel) => (
                    <div key={channel.id}>Server Channel</div>
                    // <ServerChannel
                    //   key={channel.id}
                    //   channel={channel}
                    //   server={server}
                    //   role={role}
                    // />
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
        </>
      )}
    </div>
  );
}
