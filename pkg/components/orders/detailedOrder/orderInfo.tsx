import React, { useState } from "react";
import { Section } from "./detailedOrder";
import { OrderT } from "@/types";
import { AlertTriangle, Dot, FileWarning } from "lucide-react";
import OrderMoreOptions from "../orderMoreOptions";
import { isValid } from "date-fns";
import DetailedOrderNote from "./detailedOrderNote";

export default function OrderInfo({ order }: { order: OrderT }) {
  const date = isValid(new Date(order.createdAt.seconds * 1000))
    ? new Date(order.createdAt.seconds * 1000)
    : new Date(order.createdAt);
  const ticketsQtyMinusOne = order.tickets ? order.tickets?.totalQty - 1 : 0;
  const [note, setNote] = useState(order.note ?? "");

  const handleAddNote = (newNote?: string) => {
    if (!newNote) return setNote('Note: ')
    setNote(newNote);
  };
  return (
    <>
      <Section className="flex-row items-center place-content-center bg-foreground text-background scroll w-full ">
        <p className="text-3xl font-bold flex-col flex ">
          <span>{order.customer.name}</span>
          <span className=" font-medium text-base opacity-90">
            {ticketsQtyMinusOne > 0 ? (
              <>
                & {ticketsQtyMinusOne}{" "}
                {ticketsQtyMinusOne > 1 ? "others" : "other"}
              </>
            ) : (
              <>alone</>
            )}
          </span>
        </p>
        <div className="grid gap-2">
          <OrderMoreOptions handleAddNote={handleAddNote} order={order} />
          <DetailedOrderNote handleAddNote={handleAddNote} note={note} />
        </div>
      </Section>
      <Section>
        <div className="grid gap-2 text-muted-foreground w-full">
          <p
            className={`font-bold flex  items-center w-fit text-white py-1 px-3 rounded-full bg-order-${order.type} `}
          >
            <Dot strokeWidth={5} className=" -ml-2 rounded-full" />{" "}
            {order.type?.toUpperCase()}
          </p>
          <p className="text-xl font-medium">{date.toDateString()}</p>
          <p className="text-xl font-medium -mt-3">
            {date.toLocaleTimeString()}
          </p>
          <h2>#{order.id}</h2>
        </div>
      </Section>
    </>
  );
}
