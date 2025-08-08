"use client";
import { useRouter } from "next/navigation";

interface NavigateFunction {
  (to: String, options?: NavigateOptions): void;
  (delta: number): void;
}
interface NavigateOptions {
  type?: "move" | "replace" | "new";
  preventScrollReset?: boolean;
}

export default function useNavigate(): NavigateFunction {
  const router = useRouter();

  return (...props) => {
    if (!props?.[0]) return;
    if (typeof props[0] === "number") {
      const delta: number = props[0];

      if (delta === -1) router.back();
      else if (delta === 1) router.forward();
    } else {
      const to: string = String(props[0]);
      if (props?.[1]) {
        const option = props?.[1] as NavigateOptions;
        const _option = {
          scroll: option.preventScrollReset,
        };
        if (option?.type === "new") {
          window.open(
            to.startsWith("http")
              ? to
              : `${window.location.host}${`/${to}`.replace("//", "/")}`
          );
        } else if (option?.type === "replace") {
          router.replace(to, _option);
        } else router.push(to, _option);
      } else router.push(to);
    }
  };
}
