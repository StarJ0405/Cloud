import Div from "@/components/div/Div";
import { useAuth } from "@/providers/AuthPorivder/AuthPorivder";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import LayoutClient from "./layoutClient";

export default async function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname");

  const { userData } = await useAuth();

  if (pathname === "/login") {
    if (
      userData &&
      (userData.role === "admin" || userData.role === "developer")
    ) {
      redirect("/");
    }
  } else {
    if (
      !userData ||
      (userData.role !== "admin" && userData.role !== "developer")
    ) {
      redirect("/login");
    }
  }

  return (
    <Div minHeight={"100vh"}>
      <LayoutClient>
        {/*  */}
        {children}
        {/*  */}
      </LayoutClient>
    </Div>
  );
}
