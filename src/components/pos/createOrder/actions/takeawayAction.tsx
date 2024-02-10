import { Button } from "@/components/ui/button";
import { OrderTypeT } from "@/types";
import { Loader2 } from "lucide-react";
import React from "react";

export const TakeawayAction = ({
  isLoading,
  handlePosOrders,
}: {
  isLoading: boolean;
  handlePosOrders: (type: OrderTypeT) => Promise<void>;
}) => {
  return (
    <Button
      disabled={isLoading}
      className="h-12"
      onClick={() => handlePosOrders("pickup")}
    >
      {isLoading && <Loader2 size={15} className="animate-spin mr-1" />}
      Takeaway
    </Button>
  );
};
