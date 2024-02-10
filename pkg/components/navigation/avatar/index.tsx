import React from "react";
import { AvatarMenu } from "./menu";
import { getCurrentSession } from "@/auth";

export default async function Avatar() {
  const session = await getCurrentSession();
  const user = session?.user;

  return <AvatarMenu user={user} />;
}
