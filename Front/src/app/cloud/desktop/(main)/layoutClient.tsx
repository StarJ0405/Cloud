"use client";
import Div from "@/components/div/Div";
import FlexChild from "@/components/flex/FlexChild";
import HorizontalFlex from "@/components/flex/HorizontalFlex";
import VerticalFlex from "@/components/flex/VerticalFlex";
import Image from "@/components/Image/Image";
import P from "@/components/P/P";
import { useAuth } from "@/providers/AuthPorivder/AuthPorivderClient";
import { useBrowserEvent } from "@/providers/BrowserEventProvider/BrowserEventProviderClient";
import { useNiceModal } from "@/providers/ModalProvider/ModalProviderClient";
import useNavigate from "@/shared/hooks/useNavigate";
import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function ({ children }: { children: React.ReactNode }) {
  const { userData } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      const href = window.location.href;
      navigate(`/login${href ? `?redirect_url=${href}` : ""}`);
    }
  }, [userData]);
  const [isFold, setIsFold] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { modal } = useNiceModal();
  useEffect(() => {
    if (!isFold) return;
    const handleMouseMove = (event: MouseEvent) => {
      const open = 10;
      const close = 350;
      if (modal) {
        setIsOpen(false);
        return;
      }
      if (event.clientX <= open && !isOpen) {
        setIsOpen(true);
      } else if (event.clientX > close && isOpen) {
        setIsOpen(false);
      }
    };
    if (modal) setIsOpen(false);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isFold, isOpen, modal]);

  function Sidebar() {
    const { subdomain } = useBrowserEvent();
    const navigate = useNavigate();
    const list = [
      {
        src: "/resources/images/home2.png",
        display: "홈",
        onClick: () => {
          const { hostname, port, protocol } = window.location;
          const location = `${protocol}//${hostname}${
            port ? `:${port}` : ""
          }`.replace(`${subdomain}.`, "");
          navigate(location);
        },
      },
      {
        src: "/resources/icons/cloud.png",
        display: "클라우드",
        onClick: () => {
          const { hostname, port, protocol } = window.location;
          const location = `${protocol}//cloud.${hostname.replace(
            `${subdomain}.`,
            ""
          )}${port ? `:${port}` : ""}`;
          navigate(location);
        },
      },
    ];
    return (
      <VerticalFlex className={styles.sidebarHeader} flexStart>
        <FlexChild className={styles.sidebarLine}>
          <Image
            src={userData?.thumbnail || "/resources/images/Mypage.png"}
            size={20}
            marginRight={8}
          />
          <P>{"J"}</P>
          <Image
            src="/resources/icons/arrow_twice_black.png"
            size={20}
            marginLeft={"auto"}
            onClick={() => setIsFold(true)}
            hidden={isFold}
          />
        </FlexChild>
        {list.map((bar, index) => (
          <FlexChild
            key={`sidebar_${index}`}
            className={styles.sidebarLine}
            onClick={bar.onClick}
          >
            <Image src={bar.src} size={20} marginRight={8} />
            <P>{bar.display}</P>
          </FlexChild>
        ))}
        <Div className={styles.line} marginTop={10} marginBottom={10} />
        <Cloud />
      </VerticalFlex>
    );
  }

  return (
    <FlexChild>
      <HorizontalFlex>
        <FlexChild
          hidden={isFold && !isOpen}
          className={clsx(styles.siderbarWrapper, {
            [styles.fold]: isFold,
            [styles.isOpen]: isOpen,
          })}
        >
          <Sidebar />
        </FlexChild>
        <VerticalFlex
          minHeight={"100dvh"}
          height={"100dvh"}
          maxHeight={"100dvh"}
          id="scroll"
          overflow="scroll"
          hideScrollbar
          position="relative"
        >
          <FlexChild position="absolute" top={12} left={12} hidden={!isFold}>
            <Image
              src={
                isOpen
                  ? "/resources/icons/arrow_twice_black.png"
                  : "/resources/images/hamburger35.png"
              }
              size={22}
              cursor="pointer"
              onClick={() => {
                setIsFold(!isFold);
                setIsOpen(false);
              }}
              transform="rotate(180deg)"
            />
          </FlexChild>
          {children}
        </VerticalFlex>
      </HorizontalFlex>
    </FlexChild>
  );
}
interface List {
  display: string;
  to: string;
  list?: List[];
}

function Cloud() {
  const list: List[] = [
    {
      display: "모든 파일",
      to: "/",
      list: [
        {
          display: "테스트",
          to: "/",
        },
      ],
    },
    {
      display: "즐겨찾기",
      to: "/",
    },
    {
      display: "공유",
      to: "/",
    },
  ];
  const list2 = [
    {
      display: "사진",
      to: "/",
    },
    {
      display: "동영상",
      to: "/",
    },
    {
      display: "문서",
      to: "/",
    },
    {
      display: "음악",
      to: "/",
    },
  ];

  return (
    <FlexChild>
      <VerticalFlex>
        {list.map((l) => (
          <ListChild key={l.display} l={l} />
        ))}
        <Div className={styles.line} marginTop={10} marginBottom={10} />
        {list2.map((l) => (
          <FlexChild className={styles.sidebarLine} key={l.display}>
            <Div width={20} height={20} marginRight={8} />
            <P>{l.display}</P>
          </FlexChild>
        ))}
      </VerticalFlex>
    </FlexChild>
  );
}

const ListChild = ({ l, index = 0 }: { l: List; index?: number }) => {
  const [fold, setFold] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <FlexChild
        className={styles.sidebarLine}
        maxWidth={300}
        paddingLeft={28 * index}
        key={l.display}
        onClick={() => navigate(l.to || "/")}
      >
        <Image
          src={
            fold
              ? "/resources/icons/arrow_right_black.png"
              : "/resources/icons/arrow_down_black.png"
          }
          rotate="180"
          size={20}
          padding={4}
          marginRight={8}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setFold(!fold);
          }}
        />
        <P ellipsis>{l.display}</P>
      </FlexChild>
      {!fold &&
        l?.list?.map((list) => (
          <ListChild
            key={`${l.display}_${list.display}`}
            l={list}
            index={index + 1}
          />
        ))}
    </>
  );
};
