import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignoutBtn from "@/components/shared/buttons/signoutBtn";
import { checkConnection } from "@/lib/utils";
import { Dot } from "lucide-react";
import OnlineStatus from "../connection";
export async function AvatarMenu({ user }: { user: any }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className=" w-7 h-7 hover:outline outline-[1.7px] outline-sky-500 ">
            <AvatarImage
              src={String(user?.image)}
              alt={String(user?.firstName)}
            />
            <AvatarFallback>{user?.firstName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-1 " align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {String(user?.name)}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {String(user?.email)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <OnlineStatus />
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0 font-medium">
          <SignoutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
