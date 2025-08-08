"use client";

import useClientEffect from "@/shared/hooks/useClientEffect";
import { requester } from "@/shared/Requester";
import { createContext, useContext, useState } from "react";

export const StoreContext = createContext<{
  storeData?: StoreData | null;
  setReload?: (status: boolean) => void;
  subdomain?: string | null;
}>({
  storeData: null,
  setReload: () => {},
  subdomain: null,
});

export const CategoryContext = createContext<{
  categoriesData: CategoryData[];
}>({ categoriesData: [] });
export default function StoreProviderClient({
  children,
  initStoreData,
  initCategories,
  subdomain,
}: {
  children: React.ReactNode;
  initStoreData: StoreData | null;
  initCategories: CategoryData[];
  subdomain: string | null;
}) {
  const [storeData, setStoreData] = useState<null | StoreData>(initStoreData);
  const [categoriesData, setCategoriesData] =
    useState<CategoryData[]>(initCategories);
  const [reload, setReload] = useState(false);
  useClientEffect(() => {
    if (reload) {
      setReload(false);
      requester.getStores({ subdomain }).then(({ content }) => {
        setStoreData(content?.[0] || null);
      });
    }
  }, [reload]);
  useClientEffect(() => {
    if (storeData?.id) {
      requester
        .getCategories({
          store_id: storeData.id,
          // parent_id: null,
          tree: "descendants",
        })
        .then(({ content }) => setCategoriesData(content || []));
    }
  }, [storeData]);

  return (
    <StoreContext.Provider
      value={{
        storeData,
        setReload,
        subdomain,
      }}
    >
      <CategoryContext.Provider value={{ categoriesData }}>
        {children}
      </CategoryContext.Provider>
    </StoreContext.Provider>
  );
}
export const useStore = () => useContext(StoreContext);

export const useCategories = () => useContext(CategoryContext);
