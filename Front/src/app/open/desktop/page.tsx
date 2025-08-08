import LoginForm from "@/components/login/LoginForm";
import { useAuth } from "@/providers/AuthPorivder/AuthPorivder";
import { requester } from "@/shared/Requester";
import { SearchParams } from "next/dist/server/request/search-params";
import OAuth from "./OAuth";

export default async function ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { appid, redirect_uri, state } = await searchParams;

  const response: any = await requester.isConnectExist({ appid, redirect_uri });
  if (response?.error) {
    return <p>{response.error}</p>;
  }
  const { userData } = await useAuth();
  if (!userData) {
    return <LoginForm deviceType="mobile" />;
  }

  return (
    <OAuth
      name={response.name}
      appid={String(appid || "")}
      redirect_uri={String(redirect_uri || "")}
      state={String(state || "")}
    />
  );
}
