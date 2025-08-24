"use client";

import Button from "@/components/buttons/Button";
import CheckboxAll from "@/components/choice/checkbox/CheckboxAll";
import CheckboxGroup from "@/components/choice/checkbox/CheckboxGroup";
import Div from "@/components/div/Div";
import FlexChild from "@/components/flex/FlexChild";
import HorizontalFlex from "@/components/flex/HorizontalFlex";
import VerticalFlex from "@/components/flex/VerticalFlex";
import Image from "@/components/Image/Image";
import P from "@/components/P/P";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";

interface Sort {
  label: string;
  value: string;
  orders?: Order[];
}
interface Order {
  label: string;
  value: string;
}

const sorts: Sort[] = [
  {
    label: "올린 날짜",
    value: "created_at",
    orders: [
      {
        label: "최신순",
        value: "desc",
      },
      {
        label: "오래된 순",
        value: "asc",
      },
    ],
  },
  {
    label: "수정한 날짜",
    value: "updated_at",
    orders: [
      {
        label: "최신순",
        value: "desc",
      },
      {
        label: "오래된 순",
        value: "asc",
      },
    ],
  },
  {
    label: "크기",
    value: "size",
    orders: [
      {
        label: "큰순",
        value: "desc",
      },
      {
        label: "작은 순",
        value: "asc",
      },
    ],
  },
  {
    label: "이름",
    value: "fileName",
    orders: [
      {
        label: "ㄱ-ㅎ",
        value: "asc",
      },
      {
        label: "ㅎ-ㄱ",
        value: "desc",
      },
    ],
  },
  {
    label: "종류",
    value: "type",
  },
];
export default function () {
  const [type, setType] = useState<"list" | "grid">("list");
  const [info, setInfo] = useState(false);
  const [sort, setSort] = useState<Sort>(sorts[0]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order>();
  const [foldSort, setFoldSort] = useState(0);
  useEffect(() => {
    const orders = sort.orders || [];
    setOrders(orders);
    setOrder(orders?.[0]);
  }, [sort]);
  return (
    <CheckboxGroup name="files">
      <VerticalFlex className={styles.clientWrapper}>
        <FlexChild>
          <HorizontalFlex>
            <FlexChild width={"max-content"}>
              <HorizontalFlex gap={8} justifyContent="flex-start">
                <FlexChild
                  className={styles.checkboxAllWrapper}
                  width={"max-content"}
                >
                  <CheckboxAll width={16} height={16} />
                </FlexChild>
                <FlexChild width={"max-content"}>
                  <Button className={styles.upload}>
                    <Image src="/resources/icons/upload_white.png" size={16} />
                    <P>올리기</P>
                  </Button>
                </FlexChild>
                <FlexChild width={"max-content"}>
                  <Button className={styles.buttonWrapper}>
                    <P>새로 만들기</P>
                  </Button>
                </FlexChild>
                <FlexChild width={"max-content"}>
                  <Button className={styles.buttonWrapper}>
                    <Image src="/resources/icons/setting.png" size={16} />
                    <P>파일 유형</P>
                  </Button>
                </FlexChild>
              </HorizontalFlex>
            </FlexChild>
            <FlexChild width={"max-content"}>
              <HorizontalFlex justifyContent="flex-end">
                <List
                  selected={sort}
                  list={sorts}
                  fold={foldSort !== 1}
                  setFold={(status: boolean) => setFoldSort(status ? 0 : 1)}
                  setSelect={setSort}
                />
                {orders?.length > 0 && (
                  <List
                    selected={order}
                    list={orders}
                    fold={foldSort !== 2}
                    setFold={(status: boolean) => setFoldSort(status ? 0 : 2)}
                    setSelect={setOrder}
                  />
                )}
                <FlexChild width={"max-content"} className={styles.iconWrapper}>
                  <Image
                    src={
                      type === "list"
                        ? "/resources/icons/list_active.png"
                        : "/resources/icons/list.png"
                    }
                    size={16}
                    onClick={() => setType("list")}
                  />
                </FlexChild>
                <FlexChild width={"max-content"} className={styles.iconWrapper}>
                  <Image
                    src={
                      type === "grid"
                        ? "/resources/icons/grid_active.png"
                        : "/resources/icons/grid.png"
                    }
                    size={16}
                    onClick={() => setType("grid")}
                  />
                </FlexChild>
                <FlexChild width={"max-content"} className={styles.iconWrapper}>
                  <Image
                    src={
                      info
                        ? "/resources/icons/info_active.png"
                        : "/resources/icons/info.png"
                    }
                    size={16}
                    onClick={() => setInfo(!info)}
                  />
                </FlexChild>
              </HorizontalFlex>
            </FlexChild>
          </HorizontalFlex>
        </FlexChild>
        <Div className={styles.underline} />
      </VerticalFlex>
    </CheckboxGroup>
  );
}
function List({
  selected,
  setSelect,
  list,
  fold,
  setFold,
}: {
  selected?: { label: string; value: string };
  setSelect: (value: { label: string; value: string }) => void;
  list: { label: string; value: string }[];
  fold: boolean;
  setFold: (status: boolean) => void;
}) {
  useEffect(() => {
    if (!fold && selected) {
      const event = ()=>{
        document.getElementById(`${selected.label}`)?.click()
      };
      window.addEventListener("click", event);
      return () => window.removeEventListener("click", event);
    }
  }, [fold, selected]);
  return (
    <FlexChild
      width={"max-content"}
      className={styles.listWrapper}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <FlexChild id={selected?.label} onClick={() => setFold(!fold)}>
        <P>{selected?.label}</P>
        <Image
          src={
            fold
              ? "/resources/icons/down_arrow.png"
              : "/resources/icons/up_arrow.png"
          }
          size={16}
          className={styles.updownWarpper}
        />
      </FlexChild>
      <VerticalFlex className={styles.dropdown} hidden={fold}>
        {list.map((l) => (
          <FlexChild
            key={l.label}
            className={clsx(styles.dropdownLabel, {
              [styles.select]: l.label === selected?.label,
            })}
            onClick={() => {
              setSelect(l);
              setFold(!fold);
            }}
          >
            <P>{l.label}</P>
          </FlexChild>
        ))}
      </VerticalFlex>
    </FlexChild>
  );
}
