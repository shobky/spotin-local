"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function CloseModal({ view }: { view: "modal" | "page" }) {
  const router = useRouter();
  const handleCloseModal = () => {
    if (view === "modal") {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className=" rounded-full absolute top-0 left-0 m-3 z-20 scale-90 text-foreground hover:border border-input "
      onClick={handleCloseModal}
    >
      <Cross1Icon className="" />
    </Button>
  );
}
