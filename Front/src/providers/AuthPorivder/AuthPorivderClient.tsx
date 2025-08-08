"use client";

import useClientEffect from "@/shared/hooks/useClientEffect";
import { requester } from "@/shared/Requester";
import { Cookies } from "@/shared/utils/Data";

import { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext<{
  userData?: UserData | null;
  setReload?: (status: boolean) => void;
}>({
  userData: null,
  setReload: () => {},
});

export default function AuthProviderClient({
  children,
  initUserData: initUserData,
}: {
  children: React.ReactNode;
  initUserData: UserData | null;
}) {
  const [userData, setUserData] = useState<null | UserData>(initUserData);
  const [cookies, setCookie, removeCookie] = useCookies([Cookies.JWT]);
  const { [Cookies.JWT]: token } = cookies;
  const [reload, setReload] = useState(false);
  useClientEffect(() => {
    if (!token) {
      // CSR에서 쿠기가 소멸시 즉각적인 업데이트를 위한 처리
      setUserData(null);
    } else {
      setReload(true);
    }
  }, [token]);
  useClientEffect(() => {
    if (reload) {
      setReload(false);
      requester.getCurrentUser({}, ({ user }: { user: UserData }) =>
        setUserData(user)
      );
    }
  }, [reload]);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setReload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
