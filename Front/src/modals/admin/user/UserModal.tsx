import Button from "@/components/buttons/Button";
import DatePicker from "@/components/date-picker/DatePicker";
import Div from "@/components/div/Div";
import FlexChild from "@/components/flex/FlexChild";
import HorizontalFlex from "@/components/flex/HorizontalFlex";
import VerticalFlex from "@/components/flex/VerticalFlex";
import Image from "@/components/Image/Image";
import Input from "@/components/inputs/Input";
import InputImage from "@/components/inputs/InputImage";
import P from "@/components/P/P";
import useClientEffect from "@/shared/hooks/useClientEffect";
import { numberOnlyFormat } from "@/shared/regExp";
import { PhoneString, toast, validateInputs } from "@/shared/utils/Functions";
import NiceModal from "@ebay/nice-modal-react";
import { useEffect, useRef, useState } from "react";
import ModalBase from "../../ModalBase";
import styles from "./UserModal.module.css";
const UserModal = NiceModal.create(
  ({
    user,
    edit = false,
    onSuccess,
  }: {
    user: any;
    edit?: boolean;
    onSuccess?: () => void;
  }) => {
    const [withHeader, withFooter] = [true, false];
    const [width, height] = ["min(95%, 900px)", "auto"];
    const withCloseButton = true;
    const clickOutsideToClose = true;
    const title = "유저 " + (edit ? "편집" : "상세정보");
    const buttonText = "close";
    const modal = useRef<any>(null);
    const [thumbnail] = useState(user.thumbnail ? [user.thumbnail] : []);
    const inputs = useRef<any[]>([]);
    const image = useRef<any>(null);
    const [birthday, setBirthday] = useState<any>(new Date(user?.birthday))
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const handleSave = () => {
      setIsLoading(true);
      try {
        validateInputs([...inputs.current, image.current])
          .then(({ isValid }: { isValid: boolean }) => {
            if (!isValid) return;
            const thumbnail = image.current.getValue();
            // const _data: UserDataFrame = {

            // };
            // _data.thumbnail = thumbnail;


            // adminRequester.updateUser(
            //   user.id,
            //   _data,
            //   ({ message, error }: { message?: string; error?: string }) => {
            //     setIsLoading(false);
            //     if (message) {
            //       onSuccess?.();
            //       modal.current.close();
            //     } else if (error) setError(error);
            //   }
            // );
          })
          .catch(() => {
            toast({ message: "오류가 발생했습니다." });
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
      }
    };
    useEffect(() => {
      if (!user) {
        modal.current.close();
      }
    }, [user]);
    useClientEffect(() => {
      if (error) {
        setIsLoading(false);
        toast({ message: error });
      }
    }, [error]);
    return (
      <ModalBase
        borderRadius={10}
        headerStyle
        zIndex={10055}
        ref={modal}
        width={width}
        height={height}
        withHeader={withHeader}
        withFooter={withFooter}
        withCloseButton={withCloseButton}
        clickOutsideToClose={clickOutsideToClose}
        title={title}
        buttonText={buttonText}
        styleType={'none'}
      >
        <VerticalFlex padding={"10px 20px"}>
          <FlexChild justifyContent="center">
            {edit ? (
              <Div width={300}>
                <InputImage
                  ref={image}
                  value={thumbnail}
                  placeHolder="1:1 비율의 이미지를 권장합니다."
                />
              </Div>
            ) : (
              <Image
                className={styles.image}
                src={user?.thumbnail || "/resources/images/noImage.png"}
                size={200}
              />
            )}
          </FlexChild>
          <FlexChild>
            <HorizontalFlex>
              <FlexChild className={styles.head}>
                <P>아이디</P>
              </FlexChild>
              <FlexChild className={styles.content}>
                <P>{user.username}</P>
              </FlexChild>
            </HorizontalFlex>
          </FlexChild>
          <FlexChild>
            <HorizontalFlex>
              <FlexChild className={styles.head}>
                <P>이름</P>
              </FlexChild>
              <FlexChild className={styles.content}>
                <P>{user.name}</P>
              </FlexChild>
            </HorizontalFlex>
          </FlexChild>
          <FlexChild>
            <HorizontalFlex>
              <FlexChild className={styles.head}>
                <P>닉네임</P>
              </FlexChild>
              <FlexChild className={styles.content}>
                {edit ? (
                  <Input
                    value={user.nickname}
                    width={"100%"}
                    ref={(el) => {
                      inputs.current[0] = el;
                    }}
                  />
                ) : (
                  <P>{user.nickname}</P>
                )}
              </FlexChild>
            </HorizontalFlex>
          </FlexChild>
          <FlexChild>
            <HorizontalFlex>
              <FlexChild className={styles.head}>
                <P>생일</P>
              </FlexChild>
              <FlexChild className={styles.content}>
                {edit ? (
                  <DatePicker zIndex={10055} defaultSelectedDate={birthday} onChange={(value) => setBirthday(value)} />
                ) : (
                  <P>{birthday?.toLocaleDateString()}</P>
                )}
              </FlexChild>
            </HorizontalFlex>
          </FlexChild>
          <FlexChild>
            <HorizontalFlex>
              <FlexChild className={styles.head}>
                <P>전화번호</P>
              </FlexChild>
              <FlexChild className={styles.content}>
                {edit ? (
                  <Input
                    value={user.phone}
                    width={"100%"}
                    ref={(el) => {
                      inputs.current[1] = el;
                    }}
                    onFilter={(value: any) => {
                      value = value.replace(numberOnlyFormat.exp, '');
                      return value;
                    }}
                    maxLength={11}
                  />
                ) : (
                  <P>{PhoneString(user.phone)}</P>
                )}
              </FlexChild>
            </HorizontalFlex>
          </FlexChild>
          {edit ? (
            <FlexChild justifyContent="center" gap={5}>
              <Button
                styleType="admin"
                padding={"12px 20px"}
                fontSize={18}
                isLoading={isLoading}
                onClick={handleSave}
              >
                등록
              </Button>
              <Button
                styleType="white"
                padding={"12px 20px"}
                fontSize={18}
                onClick={() => modal.current.close()}
              >
                취소
              </Button>
            </FlexChild>
          ) : (
            <FlexChild justifyContent="center" gap={5}>
              <Button
                styleType="white"
                padding={"12px 20px"}
                fontSize={18}
                onClick={() => modal.current.close()}
              >
                닫기
              </Button>
            </FlexChild>
          )}
        </VerticalFlex>
      </ModalBase>
    );
  }
);

export default UserModal;
