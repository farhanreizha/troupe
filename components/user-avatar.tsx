import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { splitUsername } from "@/lib/split-username";

interface UserAvatarProps {
  src?: string;
  className?: string;
  username?: string;
}
const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  className,
  username,
}) => {
  const name = splitUsername(username as string);

  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} />
      <AvatarFallback className="capitalize">{name}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
