"use client";
import { useDispatch, useSelector } from "@/lib/redux/store";
import Option from "./option";
import { selectCategoriesSlice } from "@/lib/redux/slices/pos/categories/categoriesSlice";
import { useEffect } from "react";
import { fetchCategoreisThunk } from "@/lib/redux/slices/pos/categories/categoreisThunk";
import { Button } from "@/components/ui/button";

export default function Categories() {

  const { categories, categoriesError, categoriesStatus } = useSelector(
    selectCategoriesSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategoreisThunk());
    }
  }, [categoriesStatus, dispatch]);

  if (categoriesStatus === "idle" || categoriesStatus === "loading")
    return (
      <div className="grid grid-cols-4 w-full gap-2 h-full">
        {[...Array(4)].map((item, i) => (
          <Button
            key={i}
            className="h-full animate-pulse bg-stone-400 dark:bg-stone-600"
          ></Button>
        ))}
      </div>
    );
  if (categoriesError)
    return <p className=" text-destructive">something went wrong..</p>;

  return (
    <div className="grid grid-cols-4 gap-2 h-full">
      {categories.map((category) => (
        <Option category={category} key={category.id} />
      ))}
    </div>
  );
}
