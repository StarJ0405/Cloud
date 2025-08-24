import { useAuth } from "@/providers/AuthPorivder/AuthPorivder";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import LayoutClient from "./layoutClient";

export default async function ({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const { userData } = await useAuth();

  if (!userData) {
    const host = headerList.get("x-forwarded-host");
    const proto = headerList.get("x-forwarded-proto");
    const pathname = headerList.get("x-pathname");
    const redirect_url = `${proto ? `${proto}://` : ""}${host}${pathname}`;
    redirect(`/login${redirect_url ? `?redirect_url=${redirect_url}` : ""}`);
  }

  return (
    <LayoutClient>
      {/*  */}
      {children}
      {/*  */}
    </LayoutClient>
  );
}
