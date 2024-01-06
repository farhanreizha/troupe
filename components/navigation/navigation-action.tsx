"use client";

import { useModal } from "@/hooks/useModalStore";
import ActionTooltip from "@/components/action-tooltip";
import { Plus } from "lucide-react";

export default function NavigationAction() {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip label="create a server" align="center">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div className="button-create_server transition">
            <Plus className="group-hover:text-white transition text-emerald-500" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}
