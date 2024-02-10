import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderTypeT } from "@/types";
import { ArrowUpRight, Dot, DotIcon, MoreVertical } from "lucide-react";

export default function MoreActionsMenu({
  handlePosOrders,
}: {
  handlePosOrders: (type: OrderTypeT) => Promise<void>;
}) {
  if (!handlePosOrders) {
    return <></>;
  }

  const handlePutOrder = async (newType: OrderTypeT) => {
    await handlePosOrders(newType);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          variant={"secondary"}
          className="rounded-full scale-75 bg-background "
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-semibold">
          More actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <button
              className="flex justify-between items-center w-full"
              onClick={() => handlePutOrder("new")}
            >
              Put active
              <DotIcon className="text-green-500 scale-150 relative left-1" />
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              className="flex justify-between w-full items-center"
              onClick={() => handlePosOrders("pickup")}
            >
              Takeaway
              <ArrowUpRight size={15} />
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
