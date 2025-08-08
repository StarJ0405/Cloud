import VerticalFlex from "@/components/flex/VerticalFlex";
import { Back } from "../../(not_footer)/(back)/layoutClient";

export default async function ({ children }: { children: React.ReactNode }) {
  return (
    <VerticalFlex id="scroll" height={"calc(100vh - 70px)"} overflow="scroll">
      <Back />
      {children}
    </VerticalFlex>
  );
}
