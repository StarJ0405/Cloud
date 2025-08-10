'use client';

import Button from "@/components/buttons/Button";
import DatePicker from "@/components/date-picker/DatePicker";
import FlexChild from "@/components/flex/FlexChild";
import VerticalFlex from "@/components/flex/VerticalFlex";
import Input from "@/components/inputs/Input";
import InputImage from "@/components/inputs/InputImage";
import P from "@/components/P/P";
import useNavigate from "@/shared/hooks/useNavigate";
import { requester } from "@/shared/Requester";
import { Cookies } from "@/shared/utils/Data";
import { getCookieOption, toast, validateInputs } from "@/shared/utils/Functions";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";

export function SignUp({ email, code }: { email: string, code: string }) {
    const inputs = useRef<any[]>([]);
    const [date, setDate] = useState<Date>(new Date())
    const [, setCookies] = useCookies([Cookies.JWT])
    const navigate = useNavigate()
    const handleButton = () => {
        const name = inputs.current[1].getValue();
        if (!name) {
            inputs.current[1].focus();
            return toast({ message: "이름을 입력해주세요" });
        }
        const password = inputs.current[2].getValue();
        if (!password) {
            inputs.current[2].focus();
            return toast({ message: "비밀번호를 입력해주세요" });
        }
        const password2 = inputs.current[2].getValue();
        if (password2!==password) {
            inputs.current[3].focus();
            return toast({ message: "비밀번호가 일치하지않습니다." });
        }
        validateInputs(inputs.current).then(({ isValid }) => {
            if (isValid) {
                const data: UserDataFrame & { code: string } = {
                    username: email,
                    code,
                    thumbnail: inputs.current[0].getValue(),
                    name,
                    password,
                    phone: inputs.current[4].getValue(),
                    birthday: date
                }
                requester.signUp(data, ({ access_token }: { access_token: string }) => {
                    setCookies(Cookies.JWT, access_token, getCookieOption())
                    navigate('/')
                })
            }
        })
    }
    return <VerticalFlex gap={20}>
        <FlexChild paddingBottom={20}>
            <InputImage ref={el => { inputs.current[0] = el }} path="/users" />
        </FlexChild>
        <FlexChild>
            <VerticalFlex gap={5}>
                <FlexChild>
                    <P fontWeight={500} fontSize={14}>이름을 입력하세요.</P>
                </FlexChild>
                <FlexChild>
                    <Input ref={el => { inputs.current[1] = el }} width={'100%'} placeHolder="이름" style={{ borderRadius: 5 }} />
                </FlexChild>
            </VerticalFlex>
        </FlexChild>
        <FlexChild>
            <VerticalFlex gap={5}>
                <FlexChild>
                    <P fontWeight={500} fontSize={14}>비밀번호 설정</P>
                </FlexChild>
                <FlexChild>
                    <Input ref={el => { inputs.current[2] = el }} type="password" width={'100%'} placeHolder="비밀번호" style={{ borderRadius: 5 }} />
                </FlexChild>
                <FlexChild>
                    <Input ref={el => { inputs.current[3] = el }} type="password" width={'100%'} placeHolder="비밀번호 재확인" style={{ borderRadius: 5 }} />
                </FlexChild>
            </VerticalFlex>
        </FlexChild>
        <FlexChild>
            <VerticalFlex gap={5}>
                <FlexChild>
                    <P fontWeight={500} fontSize={14}>전화번호</P>
                </FlexChild>
                <FlexChild>
                    <Input ref={el => { inputs.current[4] = el }} width={'100%'} placeHolder="전화번호" style={{ borderRadius: 5 }} />
                </FlexChild>
            </VerticalFlex>
        </FlexChild>
        <FlexChild>
            <VerticalFlex gap={5}>
                <FlexChild>
                    <P fontWeight={500} fontSize={14}>생일</P>
                </FlexChild>
                <FlexChild>
                    <DatePicker defaultSelectedDate={date} onChange={(value: any) => setDate(value)} />
                </FlexChild>
            </VerticalFlex>
        </FlexChild>
        <FlexChild paddingTop={20}>
            <Button width={'100%'}><P fontSize={16} fontWeight={500} onClick={handleButton}>계속</P></Button>
        </FlexChild>
    </VerticalFlex>
}