"use client";

import { useSetting } from "@/hooks/useSetting";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import { LogOut, Settings, User } from "lucide-react";

interface UserButtonProps {
  profile: Profile;
}

const UserButton: React.FC<UserButtonProps> = ({ profile }) => {
  const supabase = createClient();
  const { onOpen } = useSetting();
  const router = useRouter();

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:border-none focus:ring-0 focus:outline-none">
        <UserAvatar src={profile.imageUrl} username={profile.username} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          className="flex-between"
          onClick={() => router.push(`/${profile.id}`)}
        >
          Profile <User />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex-between"
          onClick={() => onOpen("settings", { profile })}
        >
          Settings <Settings />
        </DropdownMenuItem>

        <DropdownMenuItem className="flex-between" onClick={handleSignout}>
          Sign out <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
