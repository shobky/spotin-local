import React from "react";

export default function OrdersSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(17%,1fr))] gap-2">
      {[...Array(12)].map((order, i) => (
        <div
          key={i}
          className="w-full h-44 animate-pulse rounded-lg  aspect-video bg-stone-500 dark:bg-stone-600 block"
        ></div>
      ))}
    </div>
  );
}
