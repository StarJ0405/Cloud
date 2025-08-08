import { Cookies } from "@/shared/utils/Data";
import { cookies } from "next/headers";
import LoginFormClient from "./LoginFormClient";

export default async function LoginForm({
  deviceType,
  redirect_url,
}: {
  deviceType: DeviceType;
  redirect_url?: string;
}) {
  const _cookies = await cookies();

  return (
    <LoginFormClient
      deviceType={deviceType}
      pre_id={_cookies.get(Cookies.ID)?.value || ""}
      redirect_url={redirect_url}
    />
  );
}
