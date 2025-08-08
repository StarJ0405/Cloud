"use client";

import Button from "@/components/buttons/Button";
import Center from "@/components/center/Center";
import Div from "@/components/div/Div";
import FlexChild from "@/components/flex/FlexChild";
import HorizontalFlex from "@/components/flex/HorizontalFlex";
import VerticalFlex from "@/components/flex/VerticalFlex";
import Image from "@/components/Image/Image";
import Input from "@/components/inputs/Input";
import P from "@/components/P/P";
import Table, { Column } from "@/components/table/Table";
import Tooltip from "@/components/tooltip/Tooltip";
import { RowInterface } from "@/modals/context/ContextMenuModal";
import { adminRequester } from "@/shared/AdminRequester";
import useData from "@/shared/hooks/data/useData";
import { copy, toast } from "@/shared/utils/Functions";
import NiceModal from "@ebay/nice-modal-react";
import { useRef, useState } from "react";
import { Color } from "../regist/regist";
import styles from "./page.module.css";
export default function ({
  initCondition,
  initData,
}: {
  initCondition: any;
  initData: Pageable;
}) {
  const columns: Column[] = [
    {
      label: "id",
      code: "id",
      styling: {
        common: {
          style: {
            width: 120,
          },
        },
      },
      Cell: ({ cell }) => (
        <Tooltip
          content={cell}
          position="bottom_center"
          onClick={() => copy({ text: cell, message: `id를 복사했습니다.` })}
        >
          <P
            onClick={() => copy({ text: cell, message: `id를 복사했습니다.` })}
            width={120}
          >
            {cell}
          </P>
        </Tooltip>
      ),
    },
    {
      label: "서브도메인",
      code: "subdomain",
      Cell: ({ cell }) => (cell ? cell : "(메인페이지)"),
    },
    {
      label: "썸네일",
      code: "thumbnail",
      Cell: ({ cell }) => (
        <Tooltip
          disable={!cell}
          content={
            <Div backgroundColor="white" border={"0.5px solid #c0c0c0"}>
              <Image src={cell} size={"min(30vw,30vh)"} />
            </Div>
          }
        >
          <Image src={cell} size={50} />
        </Tooltip>
      ),
      styling: {
        common: {
          style: {
            width: 50,
          },
        },
      },
    },
    {
      label: "이름",
      code: "name",
    },
    {
      label: "단위",
      code: "currency_unit",
    },
    {
      label: "색상설정",
      Cell: ({ row }) => {
        return (
          <VerticalFlex gap={10}>
            {(row.metadata.colors || []).map((color: Color, index: number) => (
              <FlexChild key={`${index}_${color.code}`}>
                <HorizontalFlex>
                  <P>{color.label}</P>
                  <Div
                    borderRadius={"100%"}
                    backgroundColor={color.css}
                    width={20}
                    height={20}
                  />
                </HorizontalFlex>
              </FlexChild>
            ))}
          </VerticalFlex>
        );
      },
    },
    {
      label: "성인 설정",
      code: "adult",
    },
  ];
  const { stores } = useData(
    "stores",
    () => ({ select: ["id"] }),
    (condition) => adminRequester.getStores(condition),
    { onReprocessing: (data) => data?.content || [] }
  );
  const [total, setTotal] = useState(initData.NumberOfTotalElements);
  const table = useRef<any>(null);
  const input = useRef<any>(null);
  const onSearchClick = () => {
    const data: any = {};
    const q = input.current.getValue();
    if (q) data.q = q;
    table.current.setCondition(data);
  };
  const onResetClick = () => {
    input.current.empty();
    table.current.reset();
  };
  const ContextMenu = ({ x, y, row }: { x: number; y: number; row?: any }) => {
    const rows: RowInterface[] = [
      {
        label: "새로고침",
        key: "Ctrl+R",
        hotKey: "r",
        onClick: () => {
          table.current.research();
          toast({ message: "목록을 갱신했습니다." });
        },
      },
    ];
    if (row) {
      rows.push(
        {
          label: "상세보기",
          hotKey: "i",
          onClick: () => {
            NiceModal.show("storeDetail", { store: row });
          },
        },
        {
          label: "편집",
          hotKey: "e",
          onClick: () => {
            NiceModal.show("storeDetail", {
              store: row,
              edit: true,
              onSuccess: () => table.current.research(),
              max: stores?.length,
            });
          },
        },
        {
          label: "삭제",
          hotKey: "d",
          onClick: () => {
            NiceModal.show("confirm", {
              confirmText: "삭제",
              cancelText: "취소",
              message: `${row.name} 을 삭제하시겠습니까?`,
              onConfirm: async () => {
                await adminRequester.deleteStore(row.id);
                table.current.research();
              },
            });
          },
        }
      );
    }
    return { x, y, rows };
  };
  const onDetailClick = (e: React.MouseEvent, row: any) => {
    e.preventDefault();
    e.stopPropagation();
    NiceModal.show("storeDetail", { store: row });
  };
  return (
    <VerticalFlex>
      <FlexChild>
        <div className={styles.search_ontainer}>
          <VerticalFlex>
            <FlexChild>
              <VerticalFlex>
                <FlexChild>
                  <HorizontalFlex
                    gap={20}
                    justifyContent={"flex-start"}
                    borderBottom={"1px solid #e9e9e9"}
                  >
                    <FlexChild
                      width={"10%"}
                      backgroundColor={"var(--admin-table-bg-color)"}
                    >
                      <div className={styles.titleWrap}>
                        <Center>
                          <P size={16} weight={"bold"}>
                            통합검색
                          </P>
                        </Center>
                      </div>
                    </FlexChild>
                    <FlexChild width={300}>
                      <Input
                        ref={input}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") onSearchClick();
                        }}
                      />
                    </FlexChild>
                  </HorizontalFlex>
                </FlexChild>
              </VerticalFlex>
            </FlexChild>
            <FlexChild backgroundColor={"#f5f6fb"} padding={"20px 0"}>
              <HorizontalFlex gap={20}>
                <FlexChild justifyContent={"flex-end"}>
                  <Button
                    styleType="admin"
                    className={styles.button}
                    onClick={onSearchClick}
                  >
                    <P size={16}>조건검색</P>
                  </Button>
                </FlexChild>
                <FlexChild>
                  <Button
                    styleType="white"
                    className={styles.button}
                    onClick={onResetClick}
                  >
                    <P size={16}>초기화</P>
                  </Button>
                </FlexChild>
              </HorizontalFlex>
            </FlexChild>
          </VerticalFlex>
        </div>
      </FlexChild>
      <FlexChild padding={"15px 5px"}>
        <HorizontalFlex>
          <FlexChild>
            <P fontSize={18} weight={600}>
              검색 결과 : {total}건
            </P>
          </FlexChild>
          <FlexChild></FlexChild>
        </HorizontalFlex>
      </FlexChild>
      <FlexChild>
        <Table
          ref={table}
          onRowClick={(e, row) => onDetailClick(e, row)}
          name="stores"
          columns={columns}
          initCondition={initCondition}
          initLimit={20}
          initData={initData}
          onSearch={(condition) => {
            return adminRequester.getStores(condition);
          }}
          onMaxPage={(data) => {
            return Number(data?.totalPages);
          }}
          onReprocessing={(data) => data.content}
          onChange={({ origin }) => setTotal(origin.NumberOfTotalElements)}
          ContextMenu={ContextMenu}
        />
      </FlexChild>
    </VerticalFlex>
  );
}
