import { getCurrentSession } from "@/auth";
import Signout from "@/components/auth/signout";
import React from "react";

export default async function Page() {
  const session = await getCurrentSession();
  return (
    <div className="bg-secondary relative text-foreground w-full sm:w-[80%] mt-[15vh] sm:my-0 sm:mx-[10%]  h-[calc(80vh-9.25rem)] sm:h-[calc(100vh-9.25rem)] rounded-2xl flex flex-col items-center justify-center gap-[5vh]">
      <Signout view="page" session={session} />
    </div>
  );
}
