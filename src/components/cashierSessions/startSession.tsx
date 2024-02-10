import { Button } from "../ui/button";
import { cashierSessionState } from "@/types";
import { Edit2, EditIcon, X } from "lucide-react";
import Modal from "../shared/modal";
import { useState } from "react";
import { Input } from "../ui/input";
import { startNewCashierSession } from "@/lib/helpers/sessionHelpers";

export default function StartSession({
  handleModalOpen,
}: {
  handleModalOpen: (n: cashierSessionState) => void;
}) {
  const [startAmount, setStartAmount] = useState<any>(0);

  return (
    <div className="fixed z-10 bottom-[0%] right-0 m-4 w-full lg:w-[25%] p-4 bg-secondary  border border-input rounded-lg space-y-6">
      <div>
        <p className="text-lg text-center font-medium my-4">
          Your are going to start a new session.
        </p>
        <div className="flex items-center gap-2 justify-center">
          <label className=" text-muted-foreground ">Starting Amount*</label>
          <Input
            onChange={(e) => setStartAmount(e.target.value)}
            value={startAmount}
            type="number"
            placeholder="Starting Amout*"
            className=" w-20 p-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mx-[10%] ">
        <Button
          onClick={() => handleModalOpen("closed")}
          className="h-12"
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {startNewCashierSession(startAmount);handleModalOpen("closed")}}
          className="h-12 hover:bg-green-700 bg-green-600"
        >
          Start
        </Button>
      </div>
    </div>
  );
}
