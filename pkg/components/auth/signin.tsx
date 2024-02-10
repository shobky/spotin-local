import React from "react";
import Image from "next/image";
import { Session } from "next-auth";
import CloseModal from "../shared/buttons/closeModalBtn";
import { SignInWithGoogle } from "../shared/buttons/googleBtn";
export default function Signin({ session }: { session: Session | null }) {
  return (
    <>
      <CloseModal view={"modal"} />
      <Image
        alt="spotin"
        src={"/logo.png"}
        width={400}
        height={400}
        className=" w-[60%] aspect-square hover:scale-125 ease-in-out duration-500 z-10"
      />
      {session ? (
        <div>
          <h1 className="text-lg font-medium ">
            Your are signed in as {session.user?.name}
          </h1>
        </div>
      ) : (
        <div className="w-full sm:w-[90%] scale-[.85]">
          <SignInWithGoogle />
        </div>
      )}
    </>
  );
}
