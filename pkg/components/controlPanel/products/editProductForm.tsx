"use client";
import { Input } from "@/components/ui/input";
import React, { FormEvent, useState } from "react";
import SelectCategories from "./selectCategories";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "@/lib/redux/store";
import {
  editProductsSlice,
  selectProductToEditSlice,
} from "@/lib/redux/slices/modify/editProducts/editProductsSlice";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ArrowRight,
  ArrowRightIcon,
  Loader2,
} from "lucide-react";
import { editProductsThunk } from "@/lib/redux/slices/pos/products/thunks/editProductThunk";
import { selectAllActiveProducts } from "@/lib/redux/slices/pos/products/productsSelectors";
import { itemsSlice } from "@/lib/redux/slices/pos/cart/items/itemsSlice";
import { useRouter } from "next/navigation";
import { newProductThunk } from "@/lib/redux/slices/pos/products/thunks/newProductThunk";
import EditProductImage from "./editProductImage";
import { ProductKey } from "@/types";

export default function EditProductForm({
  id,
  handleToggleIngredientMenu,
  openIngredientMenu,
  children,
}: {
  id?: string;
  handleToggleIngredientMenu?: () => void;
  openIngredientMenu: boolean;
  children: React.ReactNode;
}) {
  const { product } = useSelector(selectProductToEditSlice);
  const { productsStatus, productsError, editingStatus } = useSelector(
    selectAllActiveProducts
  );

  const [newImage, setNewImage] = useState<any>(null);
  const dispatch = useDispatch();

  if (productsError )
    return <p> something went wrong, try again.</p>;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];

      setNewImage(file);
      dispatch(
        editProductsSlice.actions.editProductToEdit({
          key: "picture",
          newValue: file,
        })
      );
    }
  };

  const handleEditproduct = (key: ProductKey, newValue: any) => {
    dispatch(
      editProductsSlice.actions.editProductToEdit({
        key,
        newValue,
      })
    );
  };

  const handleSubmitProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (productsStatus === "loading" || !product) return;
    if (id === "new") {
      await dispatch(newProductThunk(product));
    } else {
      await dispatch(editProductsThunk(product));
    }
    dispatch(itemsSlice.actions.clearCart());
    dispatch(editProductsSlice.actions.pickProductToEdit(undefined));
  };

  return (
    <form
      onSubmit={handleSubmitProduct}
      className="flex stock-edit-product-form"
    >
      <div
        className={`group bg-secondary p-8 rounded-xl space-y-4 w-[22rem] z-20 relative 
        ${
          !openIngredientMenu
            ? " border-r border-input"
            : "rounded-r-none"
        }`}
      >
        <section className="flex items-center justify-between">
          <p className="font-medium text-lg">
            {product?.active ? (
              "Active"
            ) : (
              <span className="text-muted-foreground">Disabled</span>
            )}
          </p>
          <Switch
            checked={product?.active || false}
            onCheckedChange={(value) => handleEditproduct("active", value)}
          />
        </section>
        <EditProductImage
          newImage={newImage}
          product={product}
          handleFileChange={handleFileChange}
        />
        <section className="space-y-2">
          <div className="gap-2 grid grid-cols-2">
            <Input
              onChange={(e) => handleEditproduct("name", e.target.value)}
              className="h-12"
              placeholder="Name*"
              value={product?.name}
            />
            <Input
              onChange={(e) =>
                handleEditproduct("price", Number(e.target.value))
              }
              value={product?.price || " "}
              className="h-12"
              placeholder="Price*"
              type="number"
              min={0}
              max={999}
            />
          </div>
          <SelectCategories
            handleEditproduct={handleEditproduct}
            product={product}
          />
          <Button
            className="w-full h-12 flex justify-between"
            variant={"outline"}
            onClick={handleToggleIngredientMenu}
            type="button"
          >
            {!openIngredientMenu ? (
              <>
                Show ingredients <ArrowRightIcon size={17} />
              </>
            ) : (
              <>
                Hide ingredients
                <ArrowLeftIcon size={17} />
              </>
            )}
          </Button>
        </section>
        <Button
          disabled={
            editingStatus === "loading" ||
            product?.price === 0 ||
            product?.name.length === 0
          }
          className="w-full h-12"
        >
          {editingStatus === "loading" && <Loader2 className=" animate-spin" />}
          Apply changes
        </Button>
      </div>
      {children}
    </form>
  );
}
