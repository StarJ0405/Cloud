"use client";

import Button from "@/components/buttons/Button";
import FlexChild from "@/components/flex/FlexChild";
import HorizontalFlex from "@/components/flex/HorizontalFlex";
import VerticalFlex from "@/components/flex/VerticalFlex";
import P from "@/components/P/P";
import Span from "@/components/span/Span";
import useNavigate from "@/shared/hooks/useNavigate";
import { requester } from "@/shared/Requester";
import { toast } from "@/shared/utils/Functions";

export default function ({
  appid,
  name,
  redirect_uri,
  state,
}: {
  appid: string;
  name: string;
  redirect_uri: string;
  state?: string;
}) {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`${redirect_uri}${state ? `?state=${state}` : ""}`);
  };
  const handelAccept = () => {
    requester.userConnect(
      {
        appid,
      },
      ({ code }: { code?: string }) => {
        if (code) {
          navigate(
            `${redirect_uri}?code=${code}${state ? `&state=${state}` : ""}`
          );
        } else toast({ message: "알 수 없는 오류가 발생했습니다." });
      }
    );
  };
  return (
    <VerticalFlex>
      <FlexChild>
        <P>
          <Span color="var(--admin-text-color)">{name}</Span>
          <Span>에서 계정에 대한 엑세스를 요청합니다.</Span>
        </P>
      </FlexChild>
      <FlexChild>
        <P>약관..</P>
      </FlexChild>
      <FlexChild>
        <HorizontalFlex justifyContent="center" gap={10}>
          <Button onClick={handleCancel}>취소</Button>
          <Button onClick={handelAccept}>계속</Button>
        </HorizontalFlex>
      </FlexChild>
    </VerticalFlex>
  );
}
