"use client";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import google from "@/public/google.svg"


export const SignInWithGoogle = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const url = searchParams.get("callbackUrl ");

  useEffect(() => {
    return setLoading(false);
  }, []);
  return (
    <Button
      className="flex w-full rounded-xl  h-14 font-normal relative gap-2   overflow-hidde bg-blue-700 text-white hover:bg-blue-800"
      variant={"none"}
      onClick={() => {
        setLoading(true);
        signIn("google", { callbackUrl: url || "/" });
      }}
    >
      {loading ? (
        <span className="flex gap-2 text-md sm:text-xl items-center">
          <Loader2Icon className=" animate-spin" /> Signing you in
        </span>
      ) : (
        <>
          <Image
            src={google}
            width={16}
            height={16}
            priority
            alt="G"
            className=" bg-white  w-[24%] sm:w-[20%] h-14  p-2 absolute -left-[1px] rounded-l-xl  "
          />
          <span className="text-center sm:block text-sm ml-[24%]">
            Continue with Google
          </span>
        </>
      )}
    </Button>
  );
};
