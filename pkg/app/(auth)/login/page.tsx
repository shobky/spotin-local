import Image from "next/image";
import React from "react";
import { getCurrentSession } from "@/auth";
import { SignInWithGoogle } from "@/components/shared/buttons/googleBtn";
import logo from "@/public/logo.png"
export default async function page() {
  const session = await getCurrentSession();
  return (
    <div
      style={{ backgroundImage: "url(/pattern.jpg)" }}
      className="relative text-white bg-secondary w-full sm:w-[80%] sm:mx-[10%]  h-[calc(100%-3rem)] rounded-2xl flex flex-col items-center justify-center gap-[5vh]"
    >
      <Image
        alt="spotin"
        src={logo}
        width={400}
        height={400}
        className=" w-[60%] sm:w-80 hover:scale-125 ease-in-out duration-500"
      />
      {session ? (
        <div>
          <h1 className="text-lg">
            Your are signed in as {session.user?.name}
          </h1>
        </div>
      ) : (
        <div className="w-[80%] sm:w-72">
          <SignInWithGoogle />
        </div>
      )}
    </div>
  );
}
