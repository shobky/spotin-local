import React from "react";
import Avatar from "./avatar";
import { Session } from "next-auth";
import SignInBtn from "../shared/buttons/signInBtn";
import { ThemeToggler } from "../shared/buttons/themeToggler";
import NavLink from "../ui/navLink";
import SearchBox from "../shared/searchBox";
import Link from "next/link";
import Image from "next/image";
import BackBtn from "../shared/buttons/backBtn";
import OrderNewBadge from "./orderNewBadge";
import logo from '@/public/logo.png'

export default async function Navigation({
  session,
}: {
  session: Session | null;
}) {
  return (
    <nav className="w-full h-12 flex items-center justify-center sm:border-r border-input ">
      <div className="sm:fixed sm:left-0 sm:top-0 w-full h-16 py-0 px-6 flex justify-between bg-background z-10">
        <section className="flex items-center justify-center gap-10">
          <Link href={"/"}>
            <Image
              id="logo"
              alt="spotin"
              src={logo }
              quality={70}
              width={100}
              height={100}
              className={`w-8 `}
              priority
            />
          </Link>{" "}
          <div className="hidden sm:flex">
            <BackBtn />
            <NavLink name="orders" link="orders" className="relative">
              <OrderNewBadge /> Orders
            </NavLink>
            <NavLink link="/" name="pos">
              Cashier
            </NavLink>
            <NavLink
              link="dashboard/"
              name="dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink link="control-panel/products" name="controlPanel">
              Control Panel
            </NavLink>
          </div>
        </section>
        <section className="flex  items-center gap-2">
          <SearchBox className="w-[14rem]" />
          <ThemeToggler />
          {session ? <Avatar /> : <SignInBtn />}
        </section>
      </div>
    </nav>
  );
}
