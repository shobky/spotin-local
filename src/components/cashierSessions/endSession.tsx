import { Button } from "../ui/button";
import { OrderT, StateStatus, cashierSessionState } from "@/types";
import { useDispatch } from "@/lib/redux/store";
import { Loader2, X } from "lucide-react";
import Modal from "../shared/modal";
import { archiveCompletedOrdersThunk } from "@/lib/redux/slices/orders/thunks/archiveCompletedOrdersThunk";

export default function EndSession({
  ordersStatus,
  orders,
  handleModalOpen,
}: {
  ordersStatus: StateStatus;
  orders: OrderT[];
  handleModalOpen: (n: cashierSessionState) => void;
}) {

  const dispatch = useDispatch();
  const handleArchivingAllOrders = async () => {
    if (ordersStatus === "loading") return;
    await dispatch(archiveCompletedOrdersThunk(orders));
    handleModalOpen("closed");
  };

  const handleCloseShiftModal = () => {
    handleModalOpen("closed");
  };
  return (
    <Modal handleCloseShiftModal={handleCloseShiftModal}>
      <div className="flex flex-col justify-center p-10 bg-secondary backdrop-blur-3xl border border-input w-full lg:w-2/3 rounded-md">
        <Button
          onClick={() => handleModalOpen("closed")}
          size={"icon"}
          className="rounded-full absolute right-0 top-0 m-4"
          variant={"outline"}
        >
          <X />
        </Button>
        {orders.length === 0 ? (
          <p className="text-center">There are no orders to archive.</p>
        ) : (
          <>
            <p className="my-10 text-base leading-6 text-center font-light text-secondary-foreground ">
              Are you sure your want to archive all completed orders?
            </p>
            <div className="grid grid-cols-2  gap-4 mx-[10%]">
              <Button
                disabled={ordersStatus === "loading"}
                onClick={handleArchivingAllOrders}
                className="h-12 hover:bg-red-800"
                variant={"destructive"}
              >
                {ordersStatus === "loading" && (
                  <Loader2 className="animate-spin" />
                )}{" "}
                Yes
              </Button>
              <Button
                onClick={() => handleModalOpen("closed")}
                className="h-12"
                variant={"outline"}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
