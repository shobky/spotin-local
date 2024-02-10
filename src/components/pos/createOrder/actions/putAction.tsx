import { Button } from "@/components/ui/button";
import { selectCustomerSlice } from "@/lib/redux/slices/pos/cart/customer/customerSelectors";
import { customerSlice } from "@/lib/redux/slices/pos/cart/customer/customerSlice";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { Loader2 } from "lucide-react";
import React from "react";
import MoreActionsMenu from "../moreActionsMenu";
import { OrderTypeT } from "@/types";
import { toTitleCase } from "@/lib/utils";

export const PutAction = ({
  isLoading,
  handlePosOrders,
}: {
  isLoading: boolean;
  handlePosOrders: (type: OrderTypeT) => Promise<void>;
}) => {
  const { customers, customerName, customerInput } =
    useSelector(selectCustomerSlice);
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 items-center h-12 rounded-md ">
      <p
        className=" h-12 flex items-center bg-muted p-2 rounded-lg text-muted-foreground cursor-pointer w-full"
        onClick={() => dispatch(customerSlice.actions.removeCustomer())}
      >
        {toTitleCase(String(customerName))}
      </p>
      <div className="flex items-center gap-2  bg-primary rounded-lg">
        <Button
          disabled={isLoading}
          className="h-12 text-lg"
          onClick={() => handlePosOrders("preparing")}
        >
          {isLoading && <Loader2 size={15} className="animate-spin" />}
          Put
        </Button>
        <MoreActionsMenu handlePosOrders={handlePosOrders} />
      </div>
    </div>
  );
};
