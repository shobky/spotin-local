import { CartT, OrderT, OrderTypeT } from "@/types";
import React from "react";
import { Section } from "./detailedOrder";

export default function OrderItems({ cart, type }: { cart: CartT, type:OrderTypeT }) {
  return (
    <Section className="w-full h-full  gap-4">
      {cart && (
        <>
          <div className=" flex flex-col gap-6 h-[85%] px-2 pretty-scrollbar overflow-y-auto">
            <div className="flex justify-between">
              <p className="font-semibold text-xl text-muted-foreground ">
                Cart
              </p>
              <p>
                <span className="font-bold text-xl">{cart.items.length}</span>{" "}
                unique {cart.items.length > 1 ? "items" : "item"}
              </p>
            </div>
            <hr />
            <div className="  grid h-full  ">
              {cart.items.map((item, i) => {
                return (
                  <div key={i}>
                    <div className="font-light text-sm whitespace-pre-wrap break-words flex justify-between my-2">
                      <p className="relative text-base">
                        <span className=" font-bold text-xs">x</span>
                        <span className="font-bold">{item.qty}</span>{" "}
                        {item.item?.name}
                      </p>
                      <span className="font-bold">
                        {item.item?.price * item.qty}£
                      </span>
                    </div>
                    <hr className="border-muted-foreground h-2 w-full" />{" "}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col justify-start items-end ">
            <p className="text-sm text-muted-foreground">Subtotal</p>
            <p
              className={`${
                type === "canceled" && " line-through"
              } font-bold text-xl`}
            >
              {cart.total} LE
            </p>
          </div>
        </>
      )}
    </Section>
  );
}
