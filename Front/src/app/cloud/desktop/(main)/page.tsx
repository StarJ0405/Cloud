import Div from "@/components/div/Div";
import FlexChild from "@/components/flex/FlexChild";
import HorizontalFlex from "@/components/flex/HorizontalFlex";
import VerticalFlex from "@/components/flex/VerticalFlex";
import Image from "@/components/Image/Image";
import Input from "@/components/inputs/Input";
import P from "@/components/P/P";
import clsx from "clsx";
import { SearchParams } from "next/dist/server/request/search-params";
import styles from "./page.module.css";
import Client from "./client";

export default async function ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { resourceKey } = await searchParams;

  const path = resourceKey ? resourceKey : "/test/loc";
  const list = String(path)?.split("/") || [];

  return (
    <VerticalFlex>
      <FlexChild>
        <HorizontalFlex className={styles.header}>
          <FlexChild width={"max-content"}>
            {list.map((loc, index) => (
              <HorizontalFlex justifyContent="flex-start" key={`__$loc_${loc}`}>
                <FlexChild width={"max-content"}>
                  <P
                    className={clsx(styles.headerLabel, {
                      [styles.select]: list.length === index + 1,
                    })}
                  >
                    {loc || "MYBOX"}
                  </P>
                </FlexChild>
                {index + 1 !== list.length && (
                  <FlexChild width={"max-content"}>
                    <Image
                      src="/resources/icons/arrow_right.png"
                      size={20}
                      padding={5}
                    />
                  </FlexChild>
                )}
              </HorizontalFlex>
            ))}
          </FlexChild>
          <FlexChild className={styles.searchWrapper}>
            <Image
              src="/resources/icons/folder.png"
              size={16}
              position="absolute"
              left={8}
              top={8}
              zIndex={1}
            />
            <Input
              id="search"
              placeHolder="파일, 확장자, 문서 본문 검색"
              className={styles.search}
              placeHolderClassName={styles.placeHolder}
            />
            <Div
              width={34}
              height={30}
              position="absolute"
              padding={"7px 8px"}
              top={0}
              right={0}
              zIndex={1}
              backgroundColor="#0000000A"
              borderRadius={"0 4px 4px 0"}
            >
              <Image src="/resources/icons/search_black_2.png" size={16} />
            </Div>
          </FlexChild>
        </HorizontalFlex>
      </FlexChild>
      <FlexChild>
        <Client />
      </FlexChild>
    </VerticalFlex>
  );
}
