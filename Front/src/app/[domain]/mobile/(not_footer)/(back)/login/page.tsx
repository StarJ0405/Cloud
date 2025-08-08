import VerticalFlex from "@/components/flex/VerticalFlex";
import LoginForm from "@/components/login/LoginForm";

export default async function () {
  return (
    <VerticalFlex height={"100%"}>
      <LoginForm deviceType="mobile" redirect_url="/" />;
    </VerticalFlex>
  );
}
