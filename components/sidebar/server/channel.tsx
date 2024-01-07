"use client";

import ActionTooltip from "@/components/action-tooltip";
import { ModalType, useModal } from "@/hooks/useModalStore";
import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel: React.FC<ServerChannelProps> = ({
  channel,
  server,
  role,
}) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();
  const Icon = iconMap[channel.type];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <button
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full transition hover:bg-background/50",
        params?.chanelId === channel.id && "bg-background/70",
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 flex-shrink-0 text-foreground/70" />
      <p
        className={cn(
          "line-clamp-1 small-semibold text-foreground/70 group-hover:text-foreground/90 transition",
          params?.chanelId === channel.id &&
          "text-primary group-hover:text-white",
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="flex items-center ml-auto gap-x-2">
          <ActionTooltip label="Edit" side="top">
            <Edit
              className="hidden group-hover:block w-4 h-4 text-foreground/70 hover:text-foreground/90 transition"
              onClick={(e) => onAction(e, "editChannel")}
            />
          </ActionTooltip>
          <ActionTooltip label="Delete" side="top">
            <Trash
              className="hidden group-hover:block w-4 h-4 text-rose-500 hover:text-rose-600 transition"
              onClick={(e) => onAction(e, "deleteChannel")}
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-foreground/70" />
      )}
    </button>
  );
};

export default ServerChannel;
