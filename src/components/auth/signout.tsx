"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";
import { Loader2Icon } from "lucide-react";
import CloseModal from "../shared/buttons/closeModalBtn";
export default function Signout({
  session,
  view,
}: {
  session: Session | null;
  view?: "page" | "modal";
}) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <CloseModal view={"modal"} />
      <Image
        alt="spotin"
        src={"/logo.png"}
        width={600}
        height={600}
        className={`${
          view === "page" ? "w-[30%]" : "w-[60%]"
        } rounded-full  aspect-square hover:scale-125 ease-in-out duration-500 z-10`}
      />

      <div
        className={`${
          view === "page" ? "sm:w-[40%]" : "sm:w-[90%]"
        } w-full scale-[.85] text-white`}
      >
        {!session ? (
          <h1 className="text-xl font-medium text-center">
            Your are signed out,{" "}
            {
              <button
                className=" underline cursor-pointer"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                Sign in?
              </button>
            }
          </h1>
        ) : (
          <Button
            className="flex text-lg font-medium w-full rounded-xl   h-14 relative gap-2"
            variant={"destructive"}
            onClick={() => {
              setLoading(true);
              signOut();
            }}
          >
            {loading ? (
              <span className="flex gap-2 text-md sm:text-xl items-center">
                <Loader2Icon className=" animate-spin" /> Signing you out
              </span>
            ) : (
              "Signout"
            )}
          </Button>
        )}
      </div>
    </>
  );
}
