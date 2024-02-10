import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { TimerOffIcon } from "lucide-react";
import React, { useState } from "react";

export default function StopTrackerMenu({
  handleShowMenu,
}: {
  handleShowMenu: () => void;
}) {
  const [numberToStop, setNumberToStop] = useState<number>(0);
  return (
    <DropdownMenu onOpenChange={() => handleShowMenu()}>
      <DropdownMenuTrigger>
        <Button
          className="rounded-full hover:text-primary ease-in-out duration-75"
          variant={"none"}
          size={"icon"}
        >
          <TimerOffIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Stop all</DropdownMenuItem>
          <DropdownMenuItem>
            Stop{" "}
            <Input
              type="number"
              value={numberToStop}
              onChange={(e) => setNumberToStop(Number(e.target.value))}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
