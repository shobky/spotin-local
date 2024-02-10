"use client";
import { Button } from "@/components/ui/button";
import ToolTip from "@/components/ui/toolTip";
import { RotateCw } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ResetPOS() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleResetPOs = () => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.delete("cart");
    params.delete("tickets");
    params.delete("customer");

    router.push(pathname + "?" + params.toString());
    setTimeout(() => {
      setLoading(false);
    }, 150);
  };
  return (
   <ToolTip tip="reset cart">
     <Button
      variant={"ghost"}
      size={"icon"}
      className={`rounded-full ${loading && "animate-spin"}`}
      onClick={handleResetPOs}
    >
      <RotateCw />
    </Button>
   </ToolTip>
  );
}
