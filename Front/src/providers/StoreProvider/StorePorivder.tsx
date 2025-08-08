import { requester } from "@/shared/Requester";
import { headers } from "next/headers";
import StoreProviderClient from "./StorePorivderClient";

export default async function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const subdomain = headerList.get("x-subdomain");
  const store = (await requester.getStores({ subdomain })).content?.[0];
  let categories = [];
  if (store?.id) {
    categories =
      (
        await requester.getCategories({
          store_id: store.id,
          // parent_id: null,
          tree: "descendants",
        })
      )?.content || [];
  }
  return (
    <StoreProviderClient
      initStoreData={store}
      subdomain={subdomain}
      initCategories={categories}
    >
      {children}
    </StoreProviderClient>
  );
}
export const useStore = async (): Promise<{ storeData: StoreData }> => {
  const headerList = await headers();
  const subdomain = headerList.get("x-subdomain");

  const store = (await requester.getStores({ subdomain })).content?.[0];
  return { storeData: store };
};
