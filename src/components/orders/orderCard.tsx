"use client";
import { OrderT } from "@/types";
import OrderCardAction from "./orderCardAction";
import OrderMoreOptions from "./orderMoreOptions";
import { calculateOrderSubTotal } from "@/lib/helpers/ticketHelpters";
import { useDispatch } from "react-redux";
import { ordersSlcie } from "@/lib/redux/slices/orders/ordersSlice";
import { useRouter } from "next/navigation";
import OrderCardLabels from "./orderCardLabels";

export default function OrderCard({ order }: { order: OrderT }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const date =
    new Date(order.createdAt.seconds * 1000).toString() === "Invalid Date"
      ? new Date(order.createdAt)
      : new Date(order.createdAt.seconds * 1000);
  if (!order.customer.name) return;

  const handleOpenOrderDetails = () => {
    dispatch(ordersSlcie.actions.selectOrderToSignle(order));
    if (order.type === "canceled")
      return router.push("/orders/" + order.id + "?canceled=true");
    router.push("/orders/" + order.id);
  };
  return (
    <div
      id={order.id}
      className={`w-full py-2 px-4 rounded-lg flex flex-col justify-between gap-2 border
       bg-secondary hover:bg-muted relative `}
    >
      <section className="flex justify-between items-start p-2">
        <button
          onClick={handleOpenOrderDetails}
          className="flex flex-col items-start"
        >
          <p
            className={`font-bold text-left  leading-4 mb-1 ${
              order.customer.name.length > 12 ? "text-base" : "text-lg"
            }`}
          >
            {order.customer.name}
          </p>
          <p className="text-xs font-light">
            {date.toDateString() !== "Invalid Date"
              ? date.toDateString()
              : order.createdAt.toDateString()}
          </p>
          <p className="text-xs font-light">
            {date.toLocaleTimeString() !== "Invalid Date"
              ? date.toLocaleTimeString()
              : order.createdAt.toLocaleTimeString()}
          </p>
        </button>
        <div className=" flex flex-col items-end justify-start">
          <OrderMoreOptions handleAddNote={() => {}} order={order} />
          <p className="font-light text-xs">#{order.id.slice(0, 3)}</p>
        </div>
      </section>
      <section className="px-2">
        <OrderCardLabels order={order} />
      </section>
      <section className="flex flex-col text-muted-foreground px-2">
        <div className="h-10 mt-2 flex justify-between items-center">
          <OrderCardAction order={order} />
          <p
            className={`${
              order.type === "canceled" ? " line-through" : ""
            } font-bold text-lg`}
          >
            {calculateOrderSubTotal(order)}£
          </p>
        </div>
      </section>
    </div>
  );
}
