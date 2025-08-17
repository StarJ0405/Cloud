import Center from "@/components/center/Center";
import VerticalFlex from "@/components/flex/VerticalFlex";
import { Cookies } from "@/shared/utils/Data";
import { SearchParams } from "next/dist/server/request/search-params";
import { cookies } from "next/headers";
import Client from "./client";

export default async function ({
  searchParams
}: { searchParams: Promise<SearchParams> }) {
  const { redirect_url = '/' } = await searchParams;

  const _cookies = await cookies();
  return (
    <VerticalFlex height="100vh">
      <Center>
        <Client redirect_url={redirect_url as string} pre_id={_cookies.get(Cookies.ID)?.value || ""} />
      </Center>
    </VerticalFlex>
  );
}
