import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketT } from "@/types";
import { Edit, Save, TicketIcon, Trash, X } from "lucide-react";
import React, { useState } from "react";
import EditTicketsForm from "./editticketsForm";
import Modal from "@/components/shared/modal";
import { Switch } from "@/components/ui/switch";
import { useDispatch } from "@/lib/redux/store";
import { deleteTicketThunk } from "@/lib/redux/slices/pos/cart/tickets/thunks/deleteTicketThunk";

export default function TicketCard({ ticket }: { ticket: TicketT }) {
  const [open, setOpen] = useState(false);
  const [switchActive, setSwitchActive] = useState(ticket.active);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <>
      {open && (
        <Modal handleCloseShiftModal={handleCloseModal}>
          <EditTicketsForm
            handleCloseModal={handleCloseModal}
            ticket={ticket}
          />
        </Modal>
      )}
      <Card className={`${open && "flex"} p-4 group justify-between relative`}>
        <div>
          <CardHeader>
            <TicketIcon size={40} strokeWidth={1.3} />
            <CardTitle className="text-xl">
              {ticket.name.toUpperCase()}
            </CardTitle>
            <p className="font-bold text-xl"> {ticket.price}£</p>
          </CardHeader>

          <CardContent>
            {ticket.additional?.amount ? (
              <p className="text-lg">
                <span className="font-bold"> After</span>{" "}
                {ticket.additional.after / 60} Minutes the price increases{" "}
                {ticket.additional.amount}£.
              </p>
            ) : (
              <p className="text-muted-foreground text-lg"> No time limit.</p>
            )}
          </CardContent>
        </div>
        <div className="hidden group-hover:flex flex-col items-end gap-4 absolute top-0 right-0 m-10 ">
          <div className="flex gap-2 justify-between">
            <button
              className=" bg-destructive p-2 rounded-full hover:bg-red-600"
              onClick={() => dispatch(deleteTicketThunk(ticket.id))}
            >
              <Trash size={20} />
            </button>
            <button
              className="bg-muted p-2 rounded-full hover:bg-primary"
              onClick={() => setOpen(true)}
            >
              <Edit size={20} />
            </button>
          </div>
          <button className="flex items-center justify-between w-full gap-2">
            <p>
              {ticket.active ? (
                "Active"
              ) : (
                <span className="text-muted-foreground">Disabled</span>
              )}
            </p>
            <Switch
              checked={switchActive || false}
              onCheckedChange={(newValue) => setSwitchActive(newValue)}
            />
          </button>
        </div>
      </Card>
    </>
  );
}
