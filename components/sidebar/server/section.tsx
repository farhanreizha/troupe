"use client";

import ActionTooltip from "@/components/action-tooltip";
import DragItem from "@/components/drag-item";
import { useModal } from "@/hooks/useModalStore";
import { MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

const ServerSection: React.FC<ServerSectionProps> = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}) => {
  const { onOpen } = useModal();

  return (
    <div className="flex-between">
      {/* <DragItem id={label} text={label} /> */}
      <p className="subtle-semibold uppercase text-foreground/70">{label}</p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            className="text-primary/60 hover:text-foreground/90 transition"
            onClick={() =>
              onOpen("createChannel", { channelType })}
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.OWNER && sectionType === "members" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            className="text-primary/60 hover:text-foreground/90 transition"
            onClick={() =>
              onOpen("members", { server })}
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
