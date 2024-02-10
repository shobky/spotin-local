"use client";
import { Plus } from "lucide-react";
import { useDispatch } from "@/lib/redux/store";
import { editProductsSlice } from "@/lib/redux/slices/modify/editProducts/editProductsSlice";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/shared/modal";
import EditProductForm from "./editProductForm";
import Categories from "@/components/pos/categories/options";
import { Button } from "@/components/ui/button";
import IngredientsMenu from "./ingredientsMenu";

export default function AddNewProduct() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openIngredientMenu, setOpenIngredientMenu] = useState(false);

  const handleToggleIngredientMenu = () => {
    setOpenIngredientMenu(!openIngredientMenu);
  };
  const activeSegment = usePathname().split("/")[2];

  const handleAddNewProduct = () => {
    dispatch(
      editProductsSlice.actions.pickProductToEdit({
        id: "temp-default-product-id",
        category: {
          name: "",
          id: "",
        },
        name: "",
        picture: "",
        price: 0,
        active: false,
        stockQty: 0,
        ingredients: [],
      })
    );
    setOpen(true);
  };
  return (
    <>
      {open && (
        <Modal handleCloseShiftModal={() => setOpen(false)}>
          <EditProductForm
            id={"new"}
            openIngredientMenu={openIngredientMenu}
            handleToggleIngredientMenu={handleToggleIngredientMenu}
          >
            <IngredientsMenu handleToggleIngredientMenu={handleToggleIngredientMenu} openIngredientMenu={openIngredientMenu} />
          </EditProductForm>
        </Modal>
      )}
      {String(activeSegment).startsWith("products") && (
        <div className="flex gap-2 items-center ">
          <div className=" min-w-[20rem]">
            <Categories />
          </div>
          <Button
            onClick={handleAddNewProduct}
            variant={"outline"}
            className="gap-2 flex"
          >
            <Plus
              className="bg-primary rounded-full scale-105 p-[2px] text-white"
              size={20}
            />
            Add new product
          </Button>
        </div>
      )}
    </>
  );
}
