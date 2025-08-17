import { useAuth } from "@/providers/AuthPorivder/AuthPorivder";
import { redirect } from "next/navigation";
import React from "react";
import LayoutClient from "./layoutClient";

export default async function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userData } = await useAuth();
  if (!userData) redirect('/login')
  return (
    <LayoutClient>
      {/*  */}
      {children}
      {/*  */}
    </LayoutClient>
  );
}
