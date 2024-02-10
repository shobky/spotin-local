"use client";
import React from "react";
import { Button } from "../../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { KeySquare } from "lucide-react";
import ToolTip from "@/components/ui/toolTip";
import Link from "next/link";

export default function SignInBtn() {
  const pathname = usePathname();
  return (
    <Link href={`/login?callbackUrl=${pathname}`} prefetch>
      <Button>Sign In</Button>
    </Link>
  );
}
