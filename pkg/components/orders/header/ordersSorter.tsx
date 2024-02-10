"use client";
import { Button } from "@/components/ui/button";
import { SortinRules, SortinRulesKeys } from "@/types";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function OrdersSorter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sortingRulesParams = searchParams.get("sortingRules");
  const sortingRules: SortinRules = JSON.parse(String(sortingRulesParams));

  const handleSorterClick = (rule: SortinRulesKeys) => {
    const params = new URLSearchParams(searchParams);
    const newSortinRules = {
      [rule]: !sortingRules || sortingRules[rule] === "asc" ? "desc" : "asc",
    };
    const newSortingRulesString = JSON.stringify(newSortinRules);

    params.set("sortingRules", newSortingRulesString);
    router.replace(pathname + "?" + params.toString());
  };

  const clearSortingRules = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("sortingRules");
    router.replace(pathname+ "?" + params.toString());
  };

  const renderSorterButton = (rule: SortinRulesKeys) => {
    return (
      <Button
        onClick={() => handleSorterClick(rule)}
        variant={sortingRules && sortingRules[rule] ? "default" : "outline"}
        className=" rounded-full h-8 p-3 flex gap-2"
      >
        {sortingRules && sortingRules[rule] === "asc" ? (
          <ArrowDownWideNarrow strokeWidth={2} className="scale-[.9]" />
        ) : (
          <ArrowUpNarrowWide strokeWidth={2} className="scale-[.9]" />
        )}
        {rule}
      </Button>
    );
  };

  return (
    <div className=" bg-secondary  p-1 rounded-full flex gap-2 text-sm font-semibold items-center">
      {renderSorterButton("Alphapitical")}
      {renderSorterButton("Time")}
      {renderSorterButton("Subtotal")}

      <Button
        disabled={!sortingRules}
        className=" rounded-full scale-90  aspect-square  flex items-center justify-center"
        size={"icon"}
        variant={"destructive"}
        onClick={clearSortingRules}
      >
        <X />
      </Button>
    </div>
  );
}
