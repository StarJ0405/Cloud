"use client";

import { useEffect } from "react";
import { Color } from "../admin/desktop/(main)/store/regist/regist";

export default function ({
  children,
  storeData,
}: {
  children: React.ReactNode;
  storeData?: StoreData;
}) {
  useEffect(() => {
    if (storeData) {
      const colors = (storeData?.metadata?.colors || []) as Color[];
      colors?.forEach((color: Color) => {
        if (color.css)
          document.documentElement.style.setProperty(color.code, color.css);
      });
    }
  }, [storeData]);
  return <>{children}</>;
}
