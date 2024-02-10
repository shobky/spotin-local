"use client";
import Link from "next/link";
import { Button } from "./button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function NavLink({
  children,
  className,
  name,
  link,
}: {
  children: React.ReactNode;
  className?: string;
  name: string;
  link: string;
}) {
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const router = useRouter();

  const isActiveRoute = pathname.split("/")[1]
    ? pathname.split("/")[1] === name
    : "pos" === name;

  const handlechangeRoute = () => {
    if (pathname === "/" + link) return;
    const params = new URLSearchParams(searchparams);
    router.push("/" + link + "?" + params.toString());
  };
  return (
    <Button
      variant={"link"}
      role="link"
      onClick={handlechangeRoute}
      aria-disabled={isActiveRoute}
      className={` relative rounded-full text-foreground hover:text-primary text-sm font-normal hover:no-underline hover:opacity-100   ${
        isActiveRoute
          ? " hover:text-whtite  cursor-default"
          : "hover:cursor-pointer  cursor-default  opacity-70 hover:-mt-[1px] "
      }`}
    >
      {children}
    </Button>
  );
}
