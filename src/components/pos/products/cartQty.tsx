import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductT } from "@/types";
export default function CartQty({
  qty,
  handleRemoveFromCart,
}: {
  qty: number;
  handleRemoveFromCart: () => void;
}) {
  return (
    <>
      {qty > 0 && (
        <div className="flex items-center absolute right-0 top-0 z-10 ">
          <Button
            className=" rounded-full scale-[.6] text-xl cursor-text  relative -right-2 "
            variant={"secondary"}
            size={"icon"}
          >
            {qty}
          </Button>
          <Button
            onClick={handleRemoveFromCart}
            className=" rounded-full cursor-auto scale-[.6] text-3xl relative z-20 "
            variant={"destructive"}
            size={"icon"}
          >
            <X />
          </Button>
        </div>
      )}
    </>
  );
}
