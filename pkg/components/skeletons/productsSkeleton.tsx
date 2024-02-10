import React from "react";

export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-1 w-full">
      {[...Array(24)].map((item, i) => (
        <div
          key={i}
          className="bg-stone-400 dark:bg-stone-600 animate-pulse  w-full h-full aspect-square rounded-lg  "
        />
      ))}
    </div>
  );
}

export function ProductsTableSkeleton() {
  return (
    <div className="border border-input p-2 mt-[4.5rem] flex flex-col gap-2 rounded-lg">
      {[...Array(12)].map((item, i) => (
        <div key={i} className="flex items-center gap-4">
          <div
            className="bg-stone-400 dark:bg-stone-600 animate-pulse  w-4 h-4 aspect-square  rounded "
          />
          <div
            className="bg-stone-400 dark:bg-stone-600 animate-pulse  w-[150%] h-8 aspect-square  rounded "
          />
          <div
            className="bg-stone-400 dark:bg-stone-600 animate-pulse w-full h-8 aspect-square  rounded "
          />
          <div
            className="bg-stone-400 dark:bg-stone-600 animate-pulse w-[60%] h-8 aspect-square  rounded "
          />
          <div
            className="bg-stone-400 dark:bg-stone-600 animate-pulse w-[50%] h-8 aspect-square  rounded "
          />{" "}
          <div
            className="bg-stone-400 dark:bg-stone-600 animate-pulse w-[15%] h-8 aspect-square  rounded "
          />
        </div>
      ))}
    </div>
  );
}

export default function ProductsSkeleton({
  view,
}: {
  view?: "grid" | "table";
}) {
  if (view === "grid") return <ProductsGridSkeleton />;
  return <ProductsTableSkeleton />;
}
