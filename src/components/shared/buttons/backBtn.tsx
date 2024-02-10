"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();
  return (
    <Button
      size={"icon"}
      variant={"secondary"}
      className="rounded-full scale-[.7] hover:opacity-75 hover:scale-[.74]"
      onClick={() => router.back()}
    >
      <ArrowLeft />
    </Button>
  );
}
