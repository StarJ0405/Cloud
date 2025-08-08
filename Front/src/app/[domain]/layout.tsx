import notFound from "@/app/not-found";
import { useStore } from "@/providers/StoreProvider/StorePorivder";
import React from "react";
import LayoutClient from "./layoutClient";

export default async function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { storeData } = await useStore();
  if (!storeData) return notFound();

  return (
    <LayoutClient storeData={storeData}>
      {/*  */}
      {children}
      {/*  */}
    </LayoutClient>
  );
}
