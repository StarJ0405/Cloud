import Div from "@/components/div/Div";
import VerticalFlex from "@/components/flex/VerticalFlex";
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
      <VerticalFlex height={"100vh"}>
        {/*  */}
        {children}
        {/*  */}
      </VerticalFlex>
    </LayoutClient>
  );
}
