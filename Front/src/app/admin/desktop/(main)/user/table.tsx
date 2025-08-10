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
import { useBrowserEvent } from "@/providers/BrowserEventProvider/BrowserEventProviderClient";
import { adminRequester } from "@/shared/AdminRequester";
import { emailFormat } from "@/shared/regExp";
import { copy, toast } from "@/shared/utils/Functions";
import NiceModal from "@ebay/nice-modal-react";
import { useRef, useState } from "react";
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
      label: "아이디",
      code: "username",
      styling: {
        common: {
          style: {
            width: 240,
          },
        },
      },
      Cell: ({ cell }) => (
        <Tooltip
          content={cell}
          position="bottom_center"
        >
          <P
            width={240}
          >
            {cell || '미설정'}
          </P>
        </Tooltip>
      ),
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
          <Image src={cell || "/resources/images/noImage2X.png"} size={50} />
        </Tooltip>
      ),
      styling: {
        common: {
          style: {
            width: 100,
          },
        },
      },
    },
    {
      label: "이름",
      code: "name",
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
        >
          <P
            width={120}
          >
            {cell || '미설정'}
          </P>
        </Tooltip>
      ),
    },
    {
      label: "닉네임",
      code: "nickname",
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
        >
          <P
            width={120}
          >
            {cell || '미설정'}
          </P>
        </Tooltip>
      ),
    },
    {
      label: "생일",
      code: "birthday",
      styling: {
        common: {
          style: {
            width: 120,
          },
        },
      },
      Cell: ({ cell }) => cell ? `${new Date(cell).toLocaleDateString()}` : '미설정'
    },
    {
      label: "그룹",
      styling: {
        common: {
          style: {
            width: 120,
          },
        },
      },
    }
  ];
  const { domain } = useBrowserEvent()
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
      {
        label: '초대하기',
        key: "Ctrl+A",
        hotKey: "a",
        onClick: () => {
          NiceModal.show('input', {
            message: "초대할 인원의 내용을 입력해주세요",
            confirmText: "초대하기",
            cancelText: "취소",
            input: {
              label: "이메일",
              placeHolder: "이메일을 입력하세요.",
              regExp: [emailFormat]
            },
            onConfirm: (email: string) => {
              adminRequester.inviteUser({ email, domain }).then(({ error, message }) => {
                toast({ message: message || error })
              })
            }
          })
        }
      }
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
            NiceModal.show("userDetail", {
              user: row,
              edit: true,
              onSuccess: () => table.current.research(),
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
                await adminRequester.deleteUser(row.id);
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
    NiceModal.show("userDetail", { user: row });
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
          name="products"
          columns={columns}
          initCondition={initCondition}
          initLimit={20}
          initData={initData}
          onSearch={(condition) => {
            return adminRequester.getUsers(condition);
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
