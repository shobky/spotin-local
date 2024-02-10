import { selectProductToEditSlice } from "@/lib/redux/slices/modify/editProducts/editProductsSlice";
import { useSelector } from "@/lib/redux/store";
import React from "react";
import SelectedIngredientsForProduct from "./selectIngredientsForProduct";

export default function IngredientsMenu({
  openIngredientMenu,
  handleToggleIngredientMenu,
}: {
  openIngredientMenu: boolean;
  handleToggleIngredientMenu: any;
}) {
  const { product } = useSelector(selectProductToEditSlice);

  return (
    <div
      className={`ease-in-out duration-150 -ml-[23vw] z-0 min-h-[20vh] 
              ${openIngredientMenu && "ml-[0]"}`}
    >
      <div
        onClick={() => !openIngredientMenu && handleToggleIngredientMenu()}
        className={`group bg-secondary p-8  space-y-4 w-[22rem] z-20 relative h-full    ${
          openIngredientMenu ? " rounded-r-xl" : "rounded-xl cursor-pointer"
        } `}
      >
        <p className="font-normal text-md">
          Ingredients {`(${product?.name})`}
        </p>

        <SelectedIngredientsForProduct />
      </div>
    </div>
  );
}
