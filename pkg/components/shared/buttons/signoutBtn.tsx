"use client";
import { Button } from "@/components/ui/button";
import { Loader2Icon, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React, { useState } from "react";

export default function SignoutBtn() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      className=" flex items-center h-8   w-full justify-between"
      variant={"destructive"}
      onClick={() => {
        setLoading(true);
        signOut();
      }}
    >
      {loading ? (
        <span className="flex gap-2 text-sm   items-center">
          <Loader2Icon  size={17} strokeWidth={2.5} className=" animate-spin" /> Signing you out
        </span>
      ) : (
        "Signout"
      )}
      <LogOut size={15} strokeWidth={2.5} />
    </Button>
  );
}
