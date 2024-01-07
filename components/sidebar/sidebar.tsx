import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ServerHeader from "./server/header";
import ServerSearch from "./server/search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import ServerSection from "./server/section";
import ServerChannel from "./server/channel";

interface SidebarProps {
  type: "profile" | "server";
  serverId?: string;
  profileId?: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
  [MemberRole.OWNER]: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};

const Sidebar: React.FC<SidebarProps> = async ({
  type,
  serverId,
  profileId,
}) => {
  const profile = await db.profile.findFirst({ where: { id: profileId } });
  if (!profile) return redirect("/");

  const server = await db.server.findFirst({
    where: { id: serverId },
    include: {
      channels: { orderBy: { createdAt: "asc" } },
      members: { include: { profile: true }, orderBy: { role: "asc" } },
    },
  });

  if (!server) return redirect(`/${profile.username}`);

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  );
  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO,
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  );
  const members = server.members.filter(
    (member) => member.profileId !== profile.id,
  );

  const role = server.members.find((member) => member.profileId === profile.id)
    ?.role;

  return (
    <div className="sidebar_container">
      {type === "profile" && <div>Sidebar Profile</div>}
      {type === "server" && (
        <>
          <ServerHeader server={server} role={role} />
          <ScrollArea className="flex-1 px-3 space-y-2">
            <ServerSearch
              data={[
                {
                  label: "Text Channels",
                  type: "channel",
                  data: textChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  })),
                },
                {
                  label: "Voice Channels",
                  type: "channel",
                  data: audioChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  })),
                },
                {
                  label: "Video Channels",
                  type: "channel",
                  data: videoChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  })),
                },
                {
                  label: "Member",
                  type: "member",
                  data: members?.map((member) => ({
                    id: member.id,
                    name: member.profile.name,
                    icon: roleIconMap[member.role],
                  })),
                },
              ]}
            />
            <Separator className="h-[2px] bg-foreground/10 rounded-md my-2 mx-auto" />
            {!!textChannels.length && (
              <div className="py-2 space-y-2">
                <ServerSection
                  sectionType="channels"
                  channelType={ChannelType.TEXT}
                  role={role}
                  label="Text Channels"
                />
                <div className="space-y-1">
                  {textChannels.map((channel) => (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      server={server}
                      role={role}
                    />
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
        </>
      )}
    </div>
  );
};

export default Sidebar;
