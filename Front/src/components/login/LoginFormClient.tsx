"use client";

import Button from "@/components/buttons/Button";
import CheckboxChild from "@/components/choice/checkbox/CheckboxChild";
import CheckboxGroup from "@/components/choice/checkbox/CheckboxGroup";
import FlexChild from "@/components/flex/FlexChild";
import HorizontalFlex from "@/components/flex/HorizontalFlex";
import VerticalFlex from "@/components/flex/VerticalFlex";
import Input from "@/components/inputs/Input";
import P from "@/components/P/P";
import useNavigate from "@/shared/hooks/useNavigate";
import { requester } from "@/shared/Requester";
import { Cookies } from "@/shared/utils/Data";
import { getCookieOption, toast } from "@/shared/utils/Functions";
import { useState } from "react";
import { useCookies } from "react-cookie";
import styles from "./login.module.css";
import Span from "../span/Span";
import Div from "../div/Div";
import Image from "../Image/Image";

export default function ({
  pre_id,
  deviceType,
  redirect_url,
}: {
  pre_id?: string;
  deviceType: DeviceType;
  redirect_url?: string;
}) {
  const [, setCookies, removeCookie] = useCookies();
  const [id, setId] = useState(pre_id || "");
  const [password, setPassword] = useState("");
  const [checkList, setCheckList] = useState<any[]>(pre_id ? ["id"] : []);
  const navigate = useNavigate();

  return (
    <CheckboxGroup
      name="login"
      initialValues={checkList}
      onChange={(values) => setCheckList(values)}
      images={{
        off: "/resources/images/login_radio_off.png",
        on: "/resources/images/login_radio_on.png",
      }}
    >
      <VerticalFlex padding={15} width={"100%"} gap={12}>
        <VerticalFlex gap={20}>
          <VerticalFlex gap={9}>
            <FlexChild width={"100%"}>
              <P className={styles.label}>아이디(이메일)</P>
            </FlexChild>
            <FlexChild>
              <Input
                id="username"
                width={"100%"}
                value={id}
                onChange={(value) => setId(String(value))}
                placeHolder="아이디를 입력해주세요"
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    document.getElementById("password")?.focus();
                }}
              />
            </FlexChild>
          </VerticalFlex>
          <VerticalFlex gap={9}>
            <FlexChild>
              <P className={styles.label}>비밀번호</P>
            </FlexChild>
            <FlexChild>
              <Input
                id="password"
                width={"100%"}
                type="password"
                onChange={(value) => setPassword(String(value))}
                placeHolder="비밀번호를 입력해주세요"
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    document.getElementById("login")?.click();
                }}
              />
            </FlexChild>
          </VerticalFlex>
        </VerticalFlex>
        <VerticalFlex gap={22}>
          <FlexChild>
            <HorizontalFlex>
              <FlexChild gap={8}>
                <CheckboxChild id="auto" style={{ width: 22, height: 22 }} />
                <P weight={500} size={14} color="#474747">
                  자동 로그인
                </P>
              </FlexChild>
              <FlexChild width={"max-content"}>
                <P>
                  <Span
                    weight={500}
                    size={14}
                    color="#474747"
                    textDecoration={"underline"}
                  >
                    일회용 로그인
                  </Span>{" "}
                  <Span
                    width={15}
                    height={15}
                    border={"1px solid #EAEAEA"}
                    fontSize={8}
                    borderRadius={"100%"}
                  >
                    ?
                  </Span>
                </P>
              </FlexChild>
            </HorizontalFlex>
          </FlexChild>
          <FlexChild>
            <Button
              id="login"
              width={"100%"}
              height={52}
              onClick={() => {
                if (!id) {
                  document.getElementById("username")?.focus();
                  return toast({ message: "아이디를 입력해주세요" });
                }
                if (!password) {
                  document.getElementById("password")?.focus();
                  return toast({ message: "비밀번호를 입력해주세요" });
                }

                requester.login(
                  { username: id, password, keep: checkList.includes("auto") },
                  ({
                    access_token,
                    error,
                  }: {
                    access_token: string;
                    error?: string;
                  }) => {
                    if (access_token) {
                      if (checkList.includes("id"))
                        setCookies(
                          Cookies.ID,
                          id,
                          getCookieOption({ maxAge: 60 * 60 * 24 * 365 })
                        );
                      else removeCookie(Cookies.ID, getCookieOption());
                      setCookies(Cookies.JWT, access_token, getCookieOption());
                      if (redirect_url)
                        navigate(redirect_url, { type: "replace" });
                    } else if (error) {
                      document.getElementById("username")?.focus();
                      return toast({ message: error });
                    }
                  }
                );
              }}
            >
              <P weight={600} size={18}>
                로그인
              </P>
            </Button>
          </FlexChild>
          <FlexChild justifyContent="center" gap={4}>
            <P fontWeight={500} size={14} color="#474747">
              아이디 찾기
            </P>
            <Div width={0} height={10} borderRight={"1px solid #474747"} />
            <P fontWeight={500} size={14} color="#474747">
              비밀번호 찾기
            </P>
            <Div width={0} height={10} borderRight={"1px solid #474747"} />
            <P fontWeight={500} size={14} color="#474747">
              회원가입
            </P>
          </FlexChild>
        </VerticalFlex>
        <FlexChild paddingTop={20} className={styles.divider}>
          <P margin={"0 8px"} color="#8b8b8b" weight={500} fontSize={14}>
            또는
          </P>
        </FlexChild>
        <FlexChild marginTop={8} justifyContent="center">
          <P weight={500} fontSize={14} color="#8b8b8b">
            SNS 계정으로 간편하게 로그인
          </P>
        </FlexChild>
        <FlexChild paddingTop={8} gap={20} justifyContent="center">
          <Image
            src="/resources/images/social_naver.png"
            size={54}
            borderRadius={"100%"}
          />
          <Image
            src="/resources/images/social_google.png"
            size={54}
            borderRadius={"100%"}
          />
        </FlexChild>
      </VerticalFlex>
    </CheckboxGroup>
  );
}
