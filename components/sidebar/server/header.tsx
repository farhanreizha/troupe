"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/useModalStore";
import { ServerWithMembersWithProfiles } from "@/type";
import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  User,
  UserPlus,
} from "lucide-react";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader: React.FC<ServerHeaderProps> = ({ server, role }) => {
  const { onOpen } = useModal();
  const isOwner = role === MemberRole.OWNER;
  const isModerator = isOwner || role === MemberRole.MODERATOR;
  const isGuest = role === MemberRole.GUEST;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="base-medium flex-between server-header-dropdown_trigger">
          {server.name.toUpperCase()}
          <ChevronDown className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="server-header-dropdown_content">
        {isModerator && (
          <DropdownMenuItem
            className="flex-between text-indigo-500 cursor-pointer"
            onClick={() => onOpen("invite", { server })}
          >
            Invite People
            <UserPlus className="h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isOwner && (
          <>
            <DropdownMenuItem
              className="flex-between cursor-pointer"
              onClick={() => onOpen("editServer", { server })}
            >
              Server Settings
              <Settings className="h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex-between cursor-pointer"
              onClick={() => onOpen("members", { server })}
            >
              Manage Member
              <User className="h-4 w-4" />
            </DropdownMenuItem>
          </>
        )}
        {isModerator && (
          <>
            <DropdownMenuItem
              className="flex-between cursor-pointer"
              onClick={() => onOpen("createChannel", { server })}
            >
              Create Channel
              <PlusCircle className="h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {isOwner && (
          <DropdownMenuItem
            className="flex-between text-rose-500 cursor-pointer"
            onClick={() => onOpen("deleteServer", { server })}
          >
            Delete Server
            <Trash className="h-4 w-4" />
          </DropdownMenuItem>
        )}
        {!isOwner && (
          <>
            <DropdownMenuItem
              className="flex-between text-rose-500 cursor-pointer"
              onClick={() => onOpen("leaveServer", { server })}
            >
              Leave Server
              <LogOut className="h-4 w-4" />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
