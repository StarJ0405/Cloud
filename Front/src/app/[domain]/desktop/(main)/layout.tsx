import Div from "@/components/div/Div";
import VerticalFlex from "@/components/flex/VerticalFlex";
import React from "react";

export default async function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Div minHeight={"100vh"} minWidth={"100vw"}>
      {/*  */}
      {children}
      {/*  */}
    </Div>
  );
}
