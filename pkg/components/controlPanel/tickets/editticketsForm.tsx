"use client";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { StateStatus, TicketT } from "@/types";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { updateOrAddTicketThunk } from "@/lib/redux/slices/pos/cart/tickets/thunks/updateOrAddTicketThunk";
import { useDispatch } from "@/lib/redux/store";

export default function EditTicketsForm({
  ticket,
  handleCloseModal,
}: {
  ticket?: TicketT;
  handleCloseModal: () => void;
}) {
  const [newTicket, setNewTicket] = useState<any>({
    ...ticket,
    additional: { amount: null, after: null },
    active: true,
  });
  const [editTicketStatus, setEditTicketStatus] = useState<StateStatus>("idle");
  const dispatch = useDispatch();

  const handleEditTicket = (key: any, newValue: any) => {
    setNewTicket({
      ...newTicket,
      [key]: newValue,
    });
  };

  const handleSubmitProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (editTicketStatus === "loading" || !newTicket) return;
    setEditTicketStatus("loading");
    const data = {
      ticket: newTicket,
      new: ticket?.id ? false : true,
    };
    await dispatch(updateOrAddTicketThunk(data));
    setEditTicketStatus("succeeded");
    handleCloseModal();
  };

  return (
    <form
      onSubmit={handleSubmitProduct}
      className="group bg-secondary p-8 rounded-xl space-y-4 w-[22rem]"
    >
      <section className="flex items-center justify-between">
        <p className="font-medium text-lg">
          {newTicket?.active ? (
            "Active"
          ) : (
            <span className="text-muted-foreground">Disabled</span>
          )}
        </p>
        <Switch
          checked={newTicket?.active || false}
          onCheckedChange={(value) => handleEditTicket("active", value)}
        />
      </section>
      <section className="space-y-2">
        <div className="gap-3 grid grid-cols-2 ">
          <div className="">
            <Label className="text-muted-foreground">name*</Label>
            <Input
              onChange={(e) => handleEditTicket("name", e.target.value)}
              className="h-12"
              placeholder="Name*"
              value={newTicket?.name}
            />
          </div>
          <div>
            <Label className="text-muted-foreground">price*</Label>
            <Input
              onChange={(e) =>
                handleEditTicket("price", Number(e.target.value))
              }
              value={newTicket?.price || " "}
              className="h-12"
              placeholder="Price*"
              type="number"
              min={0}
              max={999}
            />
          </div>
          <div>
            <Label className="text-muted-foreground">time limit*</Label>
            <Input
              onChange={(e) =>
                handleEditTicket("additional", {
                  after: Number(e.target.value),
                  amount: newTicket.additional.amount,
                })
              }
              value={newTicket?.additional?.after}
              className="h-12"
              placeholder="Tine limit*"
              type="number"
              min={0}
            />
          </div>
          <div>
            <Label className="text-muted-foreground">limit fee*</Label>
            <Input
              onChange={(e) =>
                handleEditTicket("additional", {
                  amount: Number(e.target.value),
                  after: newTicket.additional.after,
                })
              }
              value={newTicket?.additional?.amount}
              className="h-12"
              placeholder="Amount to add   after limit*"
              type="number"
              min={0}
            />
          </div>
        </div>
      </section>
      <Button
        disabled={
          editTicketStatus === "loading" ||
          ticket?.price === 0 ||
          ticket?.name.length === 0
        }
        className="w-full h-12"
      >
        {editTicketStatus === "loading" && (
          <Loader2 className=" animate-spin" />
        )}
        Apply changes
      </Button>
    </form>
  );
}
