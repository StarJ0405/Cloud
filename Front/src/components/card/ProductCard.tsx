"use client";
import { CSSProperties } from "react";
import FlexChild from "../flex/FlexChild";
import VerticalFlex from "../flex/VerticalFlex";
import Image from "../Image/Image";
import P from "../P/P";
import Span from "../span/Span";

export default function ({
  product,
  currency_unit,
  margin,
}: {
  product: ProductData;
  currency_unit?: string;
  margin?: CSSProperties["margin"];
}) {
  if (!product) return;
  return (
    <VerticalFlex gap={2} margin={margin}>
      <FlexChild>
        {/* <Image src={product.thumbnail} width={"100%"} height={"auto"} /> */}
        <Image src={product.thumbnail} width={"100%"} />
      </FlexChild>
      <FlexChild>
        <P weight={500} fontSize={14}>
          {product.title}
        </P>
      </FlexChild>
      <FlexChild>
        <P
          color="#AAA"
          fontSize={10}
          weight={500}
          textDecoration={"line-through"}
        >
          <Span>{1200}</Span>
          <Span>{currency_unit}</Span>
        </P>
      </FlexChild>
      <FlexChild>
        <P>
          <Span color="var(--main-color)" weight={600} fontSize={14}>
            67%{" "}
          </Span>
          <Span fontSize={14} weight={600}>
            {product.price}
          </Span>
          <Span fontSize={14} weight={600}>
            {currency_unit}
          </Span>
        </P>
      </FlexChild>
    </VerticalFlex>
  );
}
