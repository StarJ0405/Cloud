import { Back } from "../layoutClient";

export default async function ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Back name="로그인" />
      {children}
    </>
  );
}
