"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import ActionTooltip from "@/components/action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  id,
  imageUrl,
  name,
}) => {
  const params = useParams();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip label={name} align="center">
      <button
        onClick={handleClick}
        className="group flex items-center relative"
      >
        <div
          className={cn(
            "absolute left-0 bg-foreground rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]",
          )}
        />
        <div
          className={cn(
            "nav-server_icon group group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
            "bg-foreground/10 text-foreground rounded-[16px]",
          )}
        >
          <Image
            fill
            sizes="100vh"
            alt="Server"
            src={imageUrl}
            placeholder="blur"
            blurDataURL={imageUrl}
          />
        </div>
      </button>
    </ActionTooltip>
  );
};
export default NavigationItem;
