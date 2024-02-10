"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoryT } from "@/types";

export default function Option({ category }: { category: CategoryT }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ActiveCategory = searchParams.get("cat") || "";
  const isActive =
    ActiveCategory === category.name ||
    (ActiveCategory === "" && category.name === "all");
  const pathname = usePathname();

  const handleCategoryCahnge = () => {
    const params = new URLSearchParams(searchParams);
    params.set("cat", category.name);
    router.replace(pathname + "?" + params.toString());
  };

  useEffect(() => {
    if (ActiveCategory === "") {
      const params = new URLSearchParams(searchParams);
      params.set("cat", "all");
      router.replace(pathname + "?" + params.toString());
    }
  }, [ActiveCategory, searchParams, pathname, router]);
  return (
    <Button
      onClick={handleCategoryCahnge}
      variant={isActive ? "default" : "outline"}
      key={category.id}
    >
      {category.name.toLocaleUpperCase()}
    </Button>
  );
}
