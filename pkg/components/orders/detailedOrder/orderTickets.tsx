import { OrderTicketsT, OrderTypeT } from "@/types";
import React, { useState } from "react";
import { Section } from "./detailedOrder";
import {
  calculateTicketsSubTotal,
  isPassedTicketPeriod,
} from "@/lib/helpers/ticketHelpters";
import { validDate } from "@/lib/utils";
import StopTrackerMenu from "./stopTrackerMenu";

export default function OrderTickets({
  tickets,
  checkoutDate,
  type,
}: {
  tickets: OrderTicketsT;
  checkoutDate: any;
  type: OrderTypeT;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <Section className="w-full h-full gap-4">
      {tickets && (
        <>
          <div className=" flex flex-col gap-6 h-[85%] px-2 pretty-scrollbar">
            <div className="flex justify-between">
              <p className="font-semibold text-xl text-muted-foreground ">
                Tickets
              </p>
              <p>
                <span className="font-bold text-xl">{tickets?.totalQty}</span>
                {tickets?.totalQty > 1 ? ` Check in's` : ` Check in`}
              </p>
            </div>
            <hr />
            <div>
              {tickets?.tickets?.map((tkt, i) => {
                const ticketStartTime = new Date(
                  tkt.ticket.start.seconds * 1000
                );
                const ticketEndTime = tkt.ticket.end
                  ? new Date(tkt.ticket.end.seconds * 1000)
                  : checkoutDate
                  ? new Date(checkoutDate.seconds * 1000)
                  : undefined;

                return (
                  <div
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}
                    key={i}
                  >
                    <div className="flex items-center justify-between my-2 overflow-hidden">
                      <section>
                        <p>
                          x{tkt.qty} {tkt.ticket.name}
                        </p>
                        <p className="text-sm">
                          started:{" "}
                          {validDate(ticketStartTime.toLocaleTimeString())
                            ? ticketStartTime.toLocaleTimeString()
                            : tkt.ticket.start.toLocaleTimeString()}
                        </p>
                      </section>
                      <div
                        className={`flex items-center gap-4 ease-in-out duration-200 ${
                          showMenu ? "" : "-mr-10"
                        }`}
                      >
                        <section className="text-sm flex flex-col-reverse items-end text-muted-foreground">
                          {ticketEndTime ? (
                            <p>
                              ended:{" "}
                              {validDate(ticketEndTime.toLocaleTimeString())
                                ? ticketEndTime.toLocaleTimeString()
                                : tkt.ticket.end.toLocaleTimeString()}
                            </p>
                          ) : (
                            <p className="text-green-400">checked in</p>
                          )}
                          <p>
                            {isPassedTicketPeriod(tkt.ticket) ? (
                              <span>full day</span>
                            ) : (
                              <span>half day</span>
                            )}
                          </p>
                        </section>
                        <section>
                          <StopTrackerMenu  handleShowMenu={handleShowMenu}/>
                        </section>
                      </div>
                    </div>
                    <hr className="w-full h-2 border-muted-foreground " />
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
              {calculateTicketsSubTotal(tickets)} LE
            </p>
          </div>
        </>
      )}
    </Section>
  );
}
