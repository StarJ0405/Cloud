"use client";
import P from "@/components/P/P";

import clsx from "clsx";
import { useRef } from "react";
import LoadingSpinner from "../loading/LoadingSpinner";
import styles from "./Button.module.css";
function Button({
  id,
  className,
  width,
  height,
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  backgroundColor,
  fontSize,
  fontWeight,
  color,
  borderRadius,
  position,
  top,
  bottom,
  left,
  right,
  disabled,
  onClick,
  onChange,
  onMouseDown,
  type = "button",
  styleType = "main",
  children,
  isLoading,
  scrollMarginTop,
}: ComponentProps<HTMLButtonElement> & {
  type?: "button" | "file";
  disabled?: boolean;
  onChange?: any;
  styleType?: "main" | "admin" | "reverse" | "white" | "admin2";
  isLoading?: boolean;
}) {
  const inputRef = useRef<any>(null);
  // 방향성 스타일 속성들을 처리
  const getDirectionalStyles = (): DirectionalStyleInterface => {
    const style: DirectionalStyleInterface = {};
    // padding 처리
    if (padding || paddingTop || paddingRight || paddingBottom || paddingLeft) {
      if (padding) style.padding = padding;
      if (paddingTop) style.paddingTop = paddingTop;
      if (paddingRight) style.paddingRight = paddingRight;
      if (paddingBottom) style.paddingBottom = paddingBottom;
      if (paddingLeft) style.paddingLeft = paddingLeft;
    }

    // margin 처리
    if (margin || marginTop || marginRight || marginBottom || marginLeft) {
      if (margin) style.margin = margin;
      if (marginTop) style.marginTop = marginTop;
      if (marginRight) style.marginRight = marginRight;
      if (marginBottom) style.marginBottom = marginBottom;
      if (marginLeft) style.marginLeft = marginLeft;
    }

    // border 처리
    if (border || borderTop || borderRight || borderBottom || borderLeft) {
      if (border) style.border = border;
      if (borderTop) style.borderTop = borderTop;
      if (borderRight) style.borderRight = borderRight;
      if (borderBottom) style.borderBottom = borderBottom;
      if (borderLeft) style.borderLeft = borderLeft;
    }

    return style;
  };
  return (
    <button
      id={id}
      disabled={disabled}
      style={{
        width,
        height,
        backgroundColor,
        border,
        fontSize,
        fontWeight,
        color,
        borderRadius,
        position,
        top,
        bottom,
        left,
        right,
        ...getDirectionalStyles(), // 방향성 스타일 적용
        scrollMarginTop,
      }}
      onClick={(e) => {
        if (isLoading) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick?.(e);
        inputRef?.current?.click?.();
      }}
      // [styles.admin]: styleType === "admin",
      // [styles.admin2]: styleType === "admin2",
      // [styles.reverse]: styleType === "reverse",
      // [styles.white]: styleType === "white",
      onMouseDown={onMouseDown}
      className={clsx(
        styles.button,
        className,
        "notranslate",
        [styles[styleType]],
        {
          [styles.disabled]: disabled,
        }
      )}
    >
      {type === "file" && (
        <input ref={inputRef} type="file" hidden onChange={onChange} />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : typeof children === "string" ? (
        <P fontSize={fontSize} fontWeight={fontWeight} color={color}>
          {children}
        </P>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
