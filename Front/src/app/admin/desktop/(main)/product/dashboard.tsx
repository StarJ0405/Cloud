"use client";
import Button from "@/components/buttons/Button";
import Center from "@/components/center/Center";
import Div from "@/components/div/Div";
import Dummy from "@/components/dummy/Dummy";
import FlexChild from "@/components/flex/FlexChild";
import HorizontalFlex from "@/components/flex/HorizontalFlex";
import VerticalFlex from "@/components/flex/VerticalFlex";
import Icon from "@/components/icons/Icon";
import Image from "@/components/Image/Image";
import Inline from "@/components/inline/Inline";
import P from "@/components/P/P";
import { JSX } from "react";
import styles from "./page.module.css";
import NiceModal from "@ebay/nice-modal-react";

export function ProductStatus({ Status: data }: { Status: any }) {
  return (
    <Div width={"100%"} maxWidth={1380} height={"auto"}>
      <div className={styles.wrap}>
        {data && (
          <HorizontalFlex>
            <FlexChild justifyContent={"center"} padding={"30px 0 20px"}>
              <HorizontalFlex>
                <FlexChild>
                  <VerticalFlex>
                    <FlexChild marginBottom={10}>
                      <Center>
                        <Image
                          src={"/resources/images/allProduct_white.png"}
                          width={40}
                        />
                      </Center>
                    </FlexChild>
                    <FlexChild marginBottom={5}>
                      <Center>
                        <P size={18} weight={500} color={"#ffffff"}>
                          전체 상품
                        </P>
                      </Center>
                    </FlexChild>
                    <FlexChild>
                      <Center>
                        <Inline alignItems={"center"}>
                          <P
                            cursor="pointer"
                            weight={"bold"}
                            size={25}
                            color={"#30D56F"}
                          >
                            {data?.list}
                          </P>
                          <P size={18} color={"#ffffff"} weight={600}>
                            개
                          </P>
                        </Inline>
                      </Center>
                    </FlexChild>
                  </VerticalFlex>
                </FlexChild>
              </HorizontalFlex>
            </FlexChild>
            <FlexChild justifyContent={"center"} padding={"30px 0 20px"}>
              <HorizontalFlex>
                <FlexChild>
                  <VerticalFlex>
                    <FlexChild marginBottom={10}>
                      <Center>
                        <Image
                          src={"/resources/images/productsOnSale_white.png"}
                          width={40}
                        />
                      </Center>
                    </FlexChild>
                    <FlexChild marginBottom={5}>
                      <Center>
                        <P size={18} weight={500} color={"#ffffff"}>
                          판매중
                        </P>
                      </Center>
                    </FlexChild>
                    <FlexChild>
                      <Center>
                        <Inline alignItems={"center"}>
                          <P
                            cursor="pointer"
                            weight={"bold"}
                            size={25}
                            color={"#30D56F"}
                          >
                            {data?.sale}
                          </P>
                          <P size={18} color={"#ffffff"} weight={600}>
                            개
                          </P>
                        </Inline>
                      </Center>
                    </FlexChild>
                  </VerticalFlex>
                </FlexChild>
              </HorizontalFlex>
            </FlexChild>
            <FlexChild justifyContent={"center"} padding={"30px 0 20px"}>
              <HorizontalFlex>
                <FlexChild>
                  <VerticalFlex>
                    <FlexChild marginBottom={10}>
                      <Center>
                        <Image
                          src={"/resources/images/soldOutProduct_white.png"}
                          width={40}
                        />
                      </Center>
                    </FlexChild>
                    <FlexChild marginBottom={5}>
                      <Center>
                        <P size={18} weight={500} color={"#ffffff"}>
                          품절
                        </P>
                      </Center>
                    </FlexChild>
                    <FlexChild>
                      <Center>
                        <Inline alignItems={"center"}>
                          <P
                            cursor="pointer"
                            weight={"bold"}
                            size={25}
                            color={"#30D56F"}
                          >
                            {data?.min}
                          </P>
                          <P size={18} color={"#ffffff"} weight={600}>
                            개
                          </P>
                        </Inline>
                      </Center>
                    </FlexChild>
                  </VerticalFlex>
                </FlexChild>
              </HorizontalFlex>
            </FlexChild>
            <FlexChild justifyContent={"center"} padding={"30px 0 20px"}>
              <HorizontalFlex>
                <FlexChild>
                  <VerticalFlex>
                    <FlexChild marginBottom={10}>
                      <Center>
                        <Image
                          src={"/resources/images/productNotShown_white.png"}
                          width={40}
                        />
                      </Center>
                    </FlexChild>
                    <FlexChild marginBottom={5}>
                      <Center>
                        <P size={18} weight={500} color={"#ffffff"}>
                          미전시
                        </P>
                      </Center>
                    </FlexChild>
                    <FlexChild>
                      <Center>
                        <Inline alignItems={"center"}>
                          <P
                            cursor="pointer"
                            weight={"bold"}
                            size={25}
                            color={"#30D56F"}
                          >
                            {data?.hide}
                          </P>
                          <P size={18} color={"#ffffff"} weight={600}>
                            개
                          </P>
                        </Inline>
                      </Center>
                    </FlexChild>
                  </VerticalFlex>
                </FlexChild>
              </HorizontalFlex>
            </FlexChild>
            <FlexChild justifyContent={"center"} padding={"30px 0 20px"}>
              <HorizontalFlex>
                <FlexChild>
                  <VerticalFlex>
                    <FlexChild marginBottom={10}>
                      <Center>
                        <Image
                          src={"/resources/images/mainItemsOnShow_white.png"}
                          width={40}
                        />
                      </Center>
                    </FlexChild>
                    <FlexChild marginBottom={5}>
                      <Center>
                        <P size={18} weight={500} color={"#ffffff"}>
                          메인상품
                        </P>
                      </Center>
                    </FlexChild>
                    <FlexChild>
                      <Center>
                        <Inline alignItems={"center"}>
                          <P
                            cursor="pointer"
                            weight={"bold"}
                            size={25}
                            color={"#30D56F"}
                          >
                            {data?.main}
                          </P>
                          <P size={18} color={"#ffffff"} weight={600}>
                            개
                          </P>
                        </Inline>
                      </Center>
                    </FlexChild>
                  </VerticalFlex>
                </FlexChild>
              </HorizontalFlex>
            </FlexChild>
          </HorizontalFlex>
        )}
      </div>
    </Div>
  );
}

export function OutOfStock({ Stock: data }: { Stock: any[] }) {
  const DummyProduct = (props: any) => {
    const { data } = props;
    return (
      <div className={styles.dummyWrap}>
        <VerticalFlex>
          <FlexChild justifyContent={"center"} marginBottom={10}>
            {/* <img
              style={{ width: "100%" }}
              src={data && data.thumbnail}
              alt={"thumbnail"}
            /> */}

            <Image
              src={
                data && data.thumbnail
                  ? data.thumbnail
                  : "resources/images/no-img.png"
              }
              alt={"thumbnail"}
              width={"clamp(130px, 72%, 170px)"}
              emptyRatio={`1 / 1`}
              border={`${
                data && data.thumbnail
                  ? "1px solid #fafafa"
                  : "1px solid #f43528"
              }`}
            />
          </FlexChild>
          <FlexChild>
            <Center>
              <Inline>
                <P
                  lineClamp={1}
                  textOverflow={"ellipsis"}
                  whiteSpace={"wrap"}
                  overflow={"hidden"}
                  size={14}
                >
                  {data?.product?.metadata?.title}
                </P>
              </Inline>
            </Center>
          </FlexChild>
          <FlexChild marginBottom={5}>
            <Center>
              <Inline>
                <P
                  lineClamp={1}
                  textOverflow={"ellipsis"}
                  whiteSpace={"wrap"}
                  overflow={"hidden"}
                  size={14}
                  weight={500}
                >
                  {data?.metadata?.title}
                </P>
              </Inline>
            </Center>
          </FlexChild>
          <FlexChild>
            <Center>
              <P size={16} color={"var(--admin-text-color)"} weight={500}>
                {data.inventory_quantity || 0}개
              </P>
            </Center>
          </FlexChild>
        </VerticalFlex>
      </div>
    );
  };

  return (
    <Div width={"100%"} height={342}>
      <div className={styles.wrap2}>
        <VerticalFlex gap={30} height="100%">
          <FlexChild height="min-content">
            <div className={styles.label}>
              <HorizontalFlex>
                <FlexChild width={"max-content"}>
                  <HorizontalFlex gap={10}>
                    <FlexChild width={"fit-content"}>
                      <Center>
                        <Icon name={"soldOut_white"} width={25} />
                      </Center>
                    </FlexChild>
                    <FlexChild>
                      <Center width={"100%"} textAlign={"left"}>
                        <P size={18} color={"white"} weight={600}>
                          품절 상품
                        </P>
                      </Center>
                    </FlexChild>
                  </HorizontalFlex>
                </FlexChild>
                <FlexChild width={"max-content"}>
                  <VerticalFlex>
                    <FlexChild>
                      <Button styleType="admin">
                        <P size={13} weight={500}>
                          + 더보기
                        </P>
                      </Button>
                    </FlexChild>
                  </VerticalFlex>
                </FlexChild>
              </HorizontalFlex>
            </div>
          </FlexChild>
          <FlexChild>
            <div style={{ height: "100%" }}>
              <HorizontalFlex gap={10} padding={"0 20px"} alignItems="start">
                {data &&
                  data.map((datum, index) => (
                    <FlexChild key={index}>
                      <DummyProduct
                        type={"취소"}
                        data={datum}
                        size={data.length}
                      />
                    </FlexChild>
                  ))}
                {data &&
                  data.length > 0 &&
                  data.length < 3 &&
                  [0, 1, 2]
                    .filter((f) => f >= data.length)
                    .map((index) => <FlexChild key={`dummy_${index}`} />)}
                {data.length === 0 && (
                  <HorizontalFlex justifyContent="center">
                    <P textAlign="center">없음</P>
                  </HorizontalFlex>
                )}
              </HorizontalFlex>
            </div>
          </FlexChild>
        </VerticalFlex>
      </div>
    </Div>
  );
}

export function AlmostOutStockProduct({ Almost: data }: { Almost: any[] }) {
  const DummyProduct = (props: any) => {
    const { data } = props;
    return (
      <div className={styles.dummyWrap}>
        <VerticalFlex>
          <FlexChild justifyContent={"center"} marginBottom={10}>
            {/* <img
              style={{ width: "100%" }}
              src={data && data.thumbnail}
              alt={"thumbnail"}
            /> */}
            <Image
              src={
                data && data.thumbnail
                  ? data.thumbnail
                  : "resources/images/no-img.png"
              }
              alt={"thumbnail"}
              width={"clamp(130px, 72%, 170px)"}
              emptyRatio={`1 / 1`}
              border={`${
                data && data.thumbnail
                  ? "1px solid #fafafa"
                  : "1px solid #f43528"
              }`}
            />
          </FlexChild>
          <FlexChild>
            <Center>
              <Inline>
                <P
                  lineClamp={1}
                  textOverflow={"ellipsis"}
                  whiteSpace={"wrap"}
                  overflow={"hidden"}
                  size={14}
                >
                  {data?.product?.metadata?.title}
                </P>
              </Inline>
            </Center>
          </FlexChild>
          <FlexChild>
            <Center>
              <Inline>
                <P
                  lineClamp={1}
                  textOverflow={"ellipsis"}
                  whiteSpace={"wrap"}
                  overflow={"hidden"}
                  size={14}
                  weight={500}
                >
                  {data?.metadata?.title}
                </P>
              </Inline>
            </Center>
          </FlexChild>
          <FlexChild>
            <Center>
              <Inline>
                <P
                  size={16}
                  weight={500}
                  color={
                    data.inventory_quantity < data.check * 0.5
                      ? "var(--admin-color)"
                      : "orange"
                  }
                >
                  {" "}
                  {data.inventory_quantity || 0}
                </P>
                <P size={16} weight={500}>
                  {" / "}
                </P>
                <P size={16} weight={500}>
                  {data.check || 0}개
                </P>
              </Inline>
            </Center>
          </FlexChild>
        </VerticalFlex>
      </div>
    );
  };

  return (
    <Div width={"100%"} height={342}>
      <div className={styles.wrap2}>
        <VerticalFlex gap={30} height="100%">
          <FlexChild height={"min-content"}>
            <div className={styles.label}>
              <HorizontalFlex>
                <FlexChild width={"max-content"}>
                  <HorizontalFlex gap={10}>
                    <FlexChild width={"fit-content"}>
                      <Center>
                        <Icon name={"soldOut_Almost_white"} width={25} />
                      </Center>
                    </FlexChild>
                    <FlexChild>
                      <Center width={"100%"} textAlign={"left"}>
                        <P size={18} color={"white"} weight={600}>
                          품절 임박 상품
                        </P>
                      </Center>
                    </FlexChild>
                  </HorizontalFlex>
                </FlexChild>
                <FlexChild width={"max-content"}>
                  <VerticalFlex>
                    <FlexChild>
                      <Button styleType="admin">
                        <P color={"#ffffff"} size={13} weight={500}>
                          + 더보기
                        </P>
                      </Button>
                    </FlexChild>
                  </VerticalFlex>
                </FlexChild>
              </HorizontalFlex>
            </div>
          </FlexChild>
          <FlexChild>
            <div style={{ height: "100%" }}>
              <HorizontalFlex gap={10} padding={"0 20px"} alignItems="start">
                {data &&
                  data.map((data, index) => (
                    <FlexChild key={index}>
                      <DummyProduct data={data} type={"취소"} />
                    </FlexChild>
                  ))}
                {data &&
                  data.length > 0 &&
                  data.length < 3 &&
                  [0, 1, 2]
                    .filter((f) => f >= data.length)
                    .map((index) => <FlexChild key={`dummy_${index}`} />)}
                {data.length === 0 && (
                  <HorizontalFlex justifyContent="center">
                    <P textAlign="center">없음</P>
                  </HorizontalFlex>
                )}
              </HorizontalFlex>
            </div>
          </FlexChild>
        </VerticalFlex>
      </div>
    </Div>
  );
}

export function ChoiceToggleMenu({
  title,
  content,
  icon,
  name,
  data,
}: {
  title: string;
  content: string;
  icon?: JSX.Element | string;
  name?: string;
  data?: any;
}) {
  return (
    <div
      className={styles.toggleMenu}
      onClick={() => {
        if (name) {
          NiceModal.show(name, data || {});
        }
      }}
    >
      <div className={styles.toggleWrap}>
        <HorizontalFlex>
          <FlexChild width={"max-content"}>
            <div className={styles.iconArea}>
              {typeof icon === "string" ? (
                <Image
                  src={icon}
                  size={60}
                  onClick={() => {
                    if (name) {
                      NiceModal.show(name);
                    }
                  }}
                />
              ) : (
                icon
              )}
            </div>
          </FlexChild>
          <FlexChild>
            <Center width={"100%"} textAlign="left" height={80}>
              <P weight={"bold"} size={18} color="#3c4b64">
                {title}
              </P>
              <Dummy height={15} />
              <P size={14}>{content}</P>
            </Center>
          </FlexChild>
        </HorizontalFlex>
      </div>
    </div>
  );
}
