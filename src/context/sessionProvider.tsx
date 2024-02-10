"use client";
import { Session } from "next-auth";
import { SessionProvider as NextSession } from "next-auth/react";

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return <NextSession session={session}>{children}</NextSession>;
}
