"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { selectCategoriesSlice } from "@/lib/redux/slices/pos/categories/categoriesSlice";
import { fetchCategoreisThunk } from "@/lib/redux/slices/pos/categories/categoreisThunk";
import { ProductKey, ProductT } from "@/types";

export default function SelectCategories({
  product,
  handleEditproduct,
}: {
  product?: ProductT;
  handleEditproduct: (key: ProductKey, newValue: any) => void;
}) {
  const { categories, categoriesStatus } = useSelector(selectCategoriesSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategoreisThunk());
    }
  }, [categoriesStatus, dispatch]);

  return (
    <Select
      value={product?.category.id || ""}  
      onValueChange={(newCatId) =>
        handleEditproduct(
          "category",
          categories.find((c) => c.id === newCatId)
        )
      }
    >
      <SelectTrigger className="w-full h-12">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories
            .filter((c) => c.name !== "all")
            .map((cat) => (
              <SelectItem value={cat.id} key={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
