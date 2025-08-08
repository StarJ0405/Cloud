import VerticalFlex from "@/components/flex/VerticalFlex";

export default async function ({ children }: { children: React.ReactNode }) {
  return (
    <VerticalFlex id="scroll" height={"calc(100vh - 70px)"} overflow="scroll">
      {children}
    </VerticalFlex>
  );
}
