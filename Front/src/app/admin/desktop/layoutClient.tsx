"use client";

import { useAuth } from "@/providers/AuthPorivder/AuthPorivderClient";
import useClientEffect from "@/shared/hooks/useClientEffect";
import useNavigate from "@/shared/hooks/useNavigate";
import { usePathname } from "next/navigation";

export default function ({ children }: { children: React.ReactNode }) {
  const { userData } = useAuth();
  const pathname = usePathname();
  const navigate = useNavigate();
  useClientEffect(() => {
    if (pathname === "/login") {
      if (
        userData &&
        (userData.role === "admin" || userData.role === "developer")
      ) {
        navigate("/");
      }
    } else {
      if (
        !userData ||
        (userData.role !== "admin" && userData.role !== "developer")
      ) {
        navigate("/login");
      }
    }
  }, [userData, pathname]);
  return <>{children}</>;
}
