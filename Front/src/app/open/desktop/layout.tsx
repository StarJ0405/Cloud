import React from "react";

export default async function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {children}
    </div>
  );
}
