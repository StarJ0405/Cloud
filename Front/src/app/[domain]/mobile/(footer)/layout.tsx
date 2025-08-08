import FlexChild from "@/components/flex/FlexChild";
import VerticalFlex from "@/components/flex/VerticalFlex";
import React from "react";
import { FooterSlot } from "./layoutClient";

export default async function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VerticalFlex height={"100vh"}>
      {/*  */}
      {children}
      {/*  */}
      <Footer />
    </VerticalFlex>
  );
}

export function Footer({}: {}) {
  const slots = [
    {
      src: "/resources/images/hamburger.png",
      active: "/resources/images/hamburger.png",
      name: "카테고리",
      paths: [],
      bans: [],
    },
    {
      src: "/resources/images/QR.png",
      active: "/resources/images/hamburger.png",
      name: "QR스캔",
      paths: [],
      bans: [],
      requireLogin: true,
    },
    {
      src: "/resources/images/home2.png",
      active: "/resources/images/home2_active.png",
      name: "홈",
      paths: ["/"],
      bans: [],
      to: "/",
    },
    {
      src: "/resources/images/Mypage.png",
      active: "/resources/images/hamburger.png",
      name: "마이",
      paths: [],
      bans: [],
      requireLogin: true,
    },
    {
      src: "/resources/images/recent.png",
      name: "최근 본 상품",
      paths: [],
      bans: [],
      requireLogin: true,
    },
  ];
  return (
    <FlexChild boxShadow="0px -1px 6px 0px #0D0D0D1A" padding={15} height={70}>
      {slots.map((slot, index) => (
        <FooterSlot
          key={`slot_${index}`}
          src={slot.src}
          active={slot?.active}
          name={slot.name}
          paths={slot.paths}
          bans={slot.bans}
          requireLogin={slot.requireLogin}
          to={slot.to}
        />
      ))}
    </FlexChild>
  );
}
