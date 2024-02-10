"use client";

import DetailedOrder from "@/components/orders/detailedOrder/detailedOrder";
import {
  selectSignleOrder,
  selectSignleOrderStatus,
} from "@/lib/redux/slices/orders/ordersSelector";
import { fetchOrderById } from "@/lib/redux/slices/orders/thunks/fetchOrderByIdThunk";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { useEffect } from "react";

export default function OrderPage({
  params,
}: {
  params: { id: string; canceled: boolean };
}) {
  const order = useSelector(selectSignleOrder);
  const orderStatus = useSelector(selectSignleOrderStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (params.canceled) return;
    async function dispatchOrders() {
      if (orderStatus === "idle") {
        await dispatch(fetchOrderById(params.id));
      }
    }
    dispatchOrders();
  }, [orderStatus, dispatch, params.id]);

  if (orderStatus !== "succeeded") {
    return <p> loading ...</p>;
  }

  if (!order) return <p>{`coudn't find order`}</p>;

  return (
    <div className="h-full">
      <DetailedOrder order={order} />
    </div>
  );
}
