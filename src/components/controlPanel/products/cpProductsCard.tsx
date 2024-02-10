"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ProductT } from "@/types";
import { useDispatch } from "react-redux";
import { editProductsSlice } from "@/lib/redux/slices/modify/editProducts/editProductsSlice";
import CpProductContextMenu from "./cpProductContextMenu";
import Modal from "@/components/shared/modal";
import EditProductForm from "./editProductForm";
import IngredientsMenu from "./ingredientsMenu";

export default function CPProductCard({ product }: { product: ProductT }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [openIngredientMenu, setOpenIngredientMenu] = useState(false);

  const handleToggleModal = () => {
    setOpen(!open);
  };
  const handleToggleIngredientMenu = () => {
    setOpenIngredientMenu(!openIngredientMenu);
  };
  const handleEditProduct = () => {
    dispatch(editProductsSlice.actions.pickProductToEdit(product));
    handleToggleModal();
  };

  return (
    <>
      {open && (
        <Modal handleCloseShiftModal={handleToggleModal}>
          <EditProductForm
            id={product.id || "new"}
            openIngredientMenu={openIngredientMenu}
            handleToggleIngredientMenu={handleToggleIngredientMenu}
          >
            <IngredientsMenu
              handleToggleIngredientMenu={handleToggleIngredientMenu}
              openIngredientMenu={openIngredientMenu}
            />
          </EditProductForm>
        </Modal>
      )}
      <div
        className={`w-full h-full group flex justify-center items-center p-4 relative aspect-square rounded-lg overflow-hidden  ${
          product.active === true
            ? "text-primary-foreground bg-primary hover:bg-orange-500  "
            : "text-muted-foreground bg-muted "
        }`}
      >
        <div
          onClick={() =>
            dispatch(editProductsSlice.actions.pickProductToEdit(product))
          }
        >
          <CpProductContextMenu
            handleEditProduct={handleEditProduct}
            id={product.id}
            active={product.active}
          />
        </div>
        <button
          onClick={handleEditProduct}
          className="flex flex-col justify-center items-center "
        >
          <Image
            src={product.picture}
            alt={product.name}
            width={200}
            height={200}
            priority
            className="object-contain w-full aspect-square  left-0 bottom-0 absolute"
          />
          <p
            style={{ textShadow: " 2px 2px rgba(0, 0, 0, 0.775)" }}
            className="text-lg  font-medium  relative "
          >
            {product.name.toLocaleLowerCase()}
          </p>
          <p className="font-bold text-sm ">£{product.price}</p>
        </button>
      </div>
    </>
  );
}
