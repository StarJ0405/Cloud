import Center from "@/components/center/Center";
import VerticalFlex from "@/components/flex/VerticalFlex";
import LoginForm from "@/components/login/LoginForm";

export default async function () {
  return (
    <VerticalFlex height="100vh">
      <Center>
        <LoginForm deviceType={"desktop"} redirect_url={"/"} />
      </Center>
    </VerticalFlex>
  );
}
