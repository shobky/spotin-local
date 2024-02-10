"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function SearchBox({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const pathname = usePathname();

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const params = new URLSearchParams(searchParams);
    params.set("q", e.target.value);
    router.replace(pathname + "?" + params.toString());
  };

  const clearSearchQuery = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    router.replace(pathname + "?" + params.toString());
  };
  return (
    <div className={"relative min-w-[100px] " + className}>
      <Input
        id="searchbox-input-id"
        value={query}
        onChange={(e) => handleSearchQuery(e)}
        className={cn("h-10 text-base min-w-[100px] pr-10")}
        placeholder="Quick Search.."
      />
      {query ? (
        <Button
          variant={"ghost"}
          size={"icon"}
          className="rounded-full absolute  right-0 top-0 h-10 w-10 scale-[.6]"
          onClick={clearSearchQuery}
        >
          <X />
        </Button>
      ) : (
        <p className="rounded-full text-muted-foreground h-full flex items-center mr-3 text-xs  absolute  right-0 top-0 ">
          <span className="">Ctrl+</span>K
        </p>
      )}
    </div>
  );
}
