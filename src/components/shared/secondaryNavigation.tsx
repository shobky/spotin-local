import React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function   SecondaryNavLink({
  link,
  name,
  className,
  children,
  disabled
}: {
  link: string;
  name?: string;
  className?: string;
  children: React.ReactNode;
  disabled?:boolean;
}) {
  const pathname = usePathname();
  const activeRoute =
    pathname.split("/")[2] === link ||
    (link === "/" && !pathname.split("/")[2]);
  const searchParams = useSearchParams();

  const router = useRouter();
  const handleGoToLink = () => {
    const params = new URLSearchParams(searchParams);
    router.push(
      "/" + pathname.split("/")[1] + "/" + link + "?" + params.toString()
    );
  };
  return (
    <Button
      id={name}
      onClick={handleGoToLink}
      disabled={disabled}
      className={cn(
        `h-7 px-2 py-0 text-sm ${
          activeRoute
            ? "bg-background hover:bg-background text-muted-foreground"
            : "text-muted-foreground "
        }`,
        className
      )}
      variant={activeRoute ? "default" : "none"}
    >
      {children}
    </Button>
  );
}

export const SecondaryNav = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      className={cn(
        "flex gap-2  w-fit  bg-muted h-[2.25rem]  p-1 items-center  rounded-md",
        className
      )}
    >
      {children}
    </nav>
  );
};
