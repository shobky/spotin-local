import { Button } from "@/components/ui/button";
import { OrderT, OrderTypeT } from "@/types";
import { Loader2 } from "lucide-react";
import React from "react";

export const AppendAction = ({
  orderToAppednTo,
  isLoading,
  handlePosOrders,
}: {
  orderToAppednTo: OrderT;
  isLoading: boolean;
  handlePosOrders: (type: OrderTypeT) => Promise<void>;
}) => {
  return (
    <div className="flex gap-2 items-center justify-between  rounded-md ">
      <p className=" h-12 flex items-center bg-muted p-2 rounded-lg text-muted-foreground cursor-not-allowed w-full">
        {orderToAppednTo.customer.name}
      </p>
      <Button
        className="h-12"
        disabled={isLoading}
        onClick={() => handlePosOrders(orderToAppednTo.type)}
      >
        {isLoading && <Loader2 size={15} className="animate-spin mr-1" />}
        Append
      </Button>
    </div>
  );
};
