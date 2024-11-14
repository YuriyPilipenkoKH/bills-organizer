"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function ClientSessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null; // Adjust the type based on your session data
}) {
  return (
  <SessionProvider session={session}>
    {children}
    </SessionProvider>
    )
}
