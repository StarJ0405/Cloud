'use client';

import Button from "@/components/buttons/Button";
import FlexChild from "@/components/flex/FlexChild";
import VerticalFlex from "@/components/flex/VerticalFlex";
import Image from "@/components/Image/Image";
import Input from "@/components/inputs/Input";
import P from "@/components/P/P";
import { useAuth } from "@/providers/AuthPorivder/AuthPorivderClient";
import useClientEffect from "@/shared/hooks/useClientEffect";
import useNavigate from "@/shared/hooks/useNavigate";
import { emailFormat } from "@/shared/regExp";
import { requester } from "@/shared/Requester";
import { Cookies } from "@/shared/utils/Data";
import { getCookieOption, toast, validateInputs } from "@/shared/utils/Functions";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

export function Social() {
    return <VerticalFlex gap={10}>
        <Line icon="/resources/images/google.png" name="Google 계정으로 계속하기" />
        <Line icon="/resources/images/apple.png" name="Apple 계정으로 계속하기" />
        <Line icon="/resources/images/naver.png" name="Naver 계정으로 계속하기" />
        <Line icon="/resources/images/kakao.png" name="Kakao 계정으로 계속하기" />
    </VerticalFlex>
}



function Line({ icon, name }: { icon: string, name: string }) {
    return <FlexChild padding={10} border={'1px solid rgba(84, 72, 49, 0.15)'} borderRadius={6}>
        <Image src={icon} size={16} />
        <P fontSize={14} width={'100%'} textAlign="center">{name}</P>
    </FlexChild>
}

export function Login({ error }: { error?: string }) {
    const { userData } = useAuth();
    const [, setCookie] = useCookies([Cookies.JWT])
    const inputs = useRef<any[]>([])
    const [expand, setExpand] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (error) toast({ message: error })
    }, [error])
    const onButtonClick = () => {
        validateInputs(inputs.current).then(async ({ isValid }: { isValid: boolean }) => {
            if (isValid) {
                const email = inputs.current[0].getValue();
                if (expand) {
                    const { access_token, error } = await requester.login({ username: email, password: inputs.current[1].getValue(), keep: true })
                    if (access_token) {
                        setCookie(Cookies.JWT, access_token, getCookieOption());
                        navigate('/')
                    }
                    if (error)
                        toast({ message: "잘못된 정보를 입력하셨습니다." });
                } else {
                    const { exist } = await requester.isExistUsername({ username: email })
                    if (exist) {
                        setExpand(true);
                    } else {
                        toast({ message: "유효하지않는 이메일입니다." });
                    }
                }
            } else {
                toast({ message: "유효하지않는 이메일입니다." });
            }
        })
    }
    const onKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') onButtonClick() }
    useEffect(() => {
        console.log(userData)
        if (userData) {
            navigate('/')
        }
    }, [userData])
    useClientEffect(() => {
        if (expand) {
            inputs.current[1].focus();
        }
    }, [expand])
    return <VerticalFlex>
        <FlexChild >
            <P size={12} color="#73726e" marginBottom={4}>이메일</P>
        </FlexChild>
        <FlexChild marginBottom={20}>
            <Input ref={el => { inputs.current[0] = el }} width={'100%'} placeHolder="이메일 주소를 입력해주세요" style={{ borderRadius: 6 }} regExp={[emailFormat]} onKeyDown={onKeyDown} onChange={() => setExpand(false)} />
        </FlexChild>
        <FlexChild hidden={!expand}>
            <P size={12} color="#73726e" marginBottom={4}>비밀번호</P>
        </FlexChild>
        <FlexChild hidden={!expand} marginBottom={20}>
            <Input type="password" ref={el => { inputs.current[1] = el }} width={'100%'} placeHolder="비밀번호를 입력해주세요" style={{ borderRadius: 6 }} onKeyDown={onKeyDown} />
        </FlexChild>
        <FlexChild>
            <Button id='login' height={36} width={'100%'} onClick={onButtonClick}><P fontSize={14} weight={500}>계속</P></Button>
        </FlexChild>
    </VerticalFlex>

}