"use client";
import { Plus } from "lucide-react";
import { useDispatch } from "@/lib/redux/store";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import EditTicketsForm from "./editticketsForm";

export default function AddNewTicket() {
  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };
  const activeSegment = usePathname().split("/")[2];

  return (
    <>
      {open && (
        <Modal handleCloseShiftModal={handleCloseModal}>
          <EditTicketsForm handleCloseModal={handleCloseModal} />
        </Modal>
      )}
      {String(activeSegment).startsWith("tickets") && (
        <Button
          onClick={() => setOpen(true)}
          variant={"outline"}
          className="gap-2 flex"
        >
          <Plus
            className="bg-primary rounded-full scale-105 p-[2px] text-white"
            size={20}
          />
          Add new ticket
        </Button>
      )}
    </>
  );
}
