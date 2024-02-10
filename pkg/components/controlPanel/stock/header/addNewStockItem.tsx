import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import Modal from "../../../shared/modal";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { selectStockItemToEdit } from "@/lib/redux/slices/stock/stockItemsSelectors";
import { stockItemsSlice } from "@/lib/redux/slices/stock/stockSlice";
import EditingStockItemForm from "../editingStockItemForm";

export default function AddNewStockItem() {
  const stockItemToEdit = useSelector(selectStockItemToEdit);
  const dispatch = useDispatch();

  const hadnleCloseModal = () => {
    dispatch(stockItemsSlice.actions.pickStockItemToEdit(undefined));
  };

  return (
    <>
      {stockItemToEdit && (
        <Modal handleCloseShiftModal={hadnleCloseModal}>
          <EditingStockItemForm
            id={stockItemToEdit ? stockItemToEdit.id : "new"}
          />
        </Modal>
      )}
      <Button
        onClick={() =>
          dispatch(
            stockItemsSlice.actions.pickStockItemToEdit({
              unit: "item",
              name: "",
              amount: 1,
              usedIn: [],
            })
          )
        }
        variant={"outline"}
        className="gap-2 flex cursor-pointer z-10"
      >
        <Plus
          className="bg-primary rounded-full scale-105 p-[2px] text-white"
          size={20}
        />
        Add new stock item
      </Button>
    </>
  );
}
