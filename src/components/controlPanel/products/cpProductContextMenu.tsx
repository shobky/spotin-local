import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideEdit, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { DeleteProductDialog } from "./deleteProductDialog";
import { useDispatch } from "@/lib/redux/store";
import { Switch } from "@/components/ui/switch";
import { handleToggleProductActivity } from "@/lib/helpers/productHelpers";

export default function CpProductContextMenu({
  id,
  active,
  handleEditProduct,
}: {
  id: string;
  active: boolean | undefined;
  handleEditProduct: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleMenu = () => setOpen(!open);
  const dispatch = useDispatch();
  const [switchActive, setSwitchActive] = useState(active);

  return (
    <DropdownMenu open={open} modal={true}>
      <DropdownMenuTrigger
        onClick={handleMenu}
        className="absolute right-0 top-0 p-1 z-[3]"
      >
        <Button
          size={"icon"}
          className=" rounded-full scale-[.6] opacity-0 group-hover:opacity-100"
          variant={"secondary"}
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onInteractOutside={handleMenu}
        onMouseLeave={handleMenu}
        className=" w-40"
      >
        <DropdownMenuLabel className="font-normal">
          More Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleMenu}>
          <button
            className="flex justify-between w-full cursor-pointer"
            onClick={handleEditProduct}
          >
            Edit Product <LucideEdit size={15} />
          </button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            onClick={() => console.log(active, "<---")}
            className="flex items-center justify-between w-full"
          >
            <p>
              {active ? (
                "Active"
              ) : (
                <span className="text-muted-foreground">Disabled</span>
              )}
            </p>
            <Switch
              checked={switchActive || false}
              onCheckedChange={(newValue) => {
                handleToggleProductActivity(dispatch, id, newValue);
                setSwitchActive(newValue);
              }}
            />
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <DeleteProductDialog handleMenu={handleMenu} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
