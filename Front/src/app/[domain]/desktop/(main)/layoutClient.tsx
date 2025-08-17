'use client';
import FlexChild from "@/components/flex/FlexChild";
import HorizontalFlex from "@/components/flex/HorizontalFlex";
import VerticalFlex from "@/components/flex/VerticalFlex";
import Image from "@/components/Image/Image";
import P from "@/components/P/P";
import { useAuth } from "@/providers/AuthPorivder/AuthPorivderClient";
import { useNiceModal } from "@/providers/ModalProvider/ModalProviderClient";
import useNavigate from "@/shared/hooks/useNavigate";
import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function ({ children }: { children: React.ReactNode }) {
    const { userData } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (!userData) {
            navigate('/login')
        }
    }, [userData])
    const [isFold, setIsFold] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
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
        const list = [{
            src: "/resources/images/home2.png",
            display: "홈"
        }]
        return <VerticalFlex className={styles.sidebarHeader} flexStart >
            <FlexChild className={styles.sidebarLine}>
                <Image size={20} marginRight={8} />
                <P>{"J"}</P>
                <Image src="/resources/icons/arrow_twice_black.png" size={20} marginLeft={'auto'} onClick={() => setIsFold(true)} hidden={isFold} />
            </FlexChild>
            <FlexChild className={styles.sidebarLine}>

            </FlexChild>
            {
                list.map((bar, index) => <FlexChild key={`sidebar_${index}`} className={styles.sidebarLine}>
                    <Image src={bar.src} size={20} marginRight={8} />
                    <P>{bar.display}</P>
                </FlexChild>)
            }
        </VerticalFlex>
    }

    return <FlexChild >
        <HorizontalFlex>
            <FlexChild hidden={isFold && !isOpen} className={clsx(styles.siderbarWrapper, {
                [styles.fold]: isFold,
                [styles.isOpen]: isOpen
            })}>
                <Sidebar />
            </FlexChild>
            <VerticalFlex minHeight={'100dvh'} height={"100dvh"} maxHeight={'100dvh'} id="scroll" overflow="scroll" hideScrollbar position="relative">
                <FlexChild position="absolute" top={12} left={12} hidden={!isFold}>
                    <Image src={isOpen ? "/resources/icons/arrow_twice_black.png" : "/resources/images/hamburger35.png"} size={22} cursor="pointer" onClick={() => { setIsFold(!isFold); setIsOpen(false); }} transform="rotate(180deg)" />
                </FlexChild>
                {children}
            </VerticalFlex>
        </HorizontalFlex>
    </FlexChild>
}
