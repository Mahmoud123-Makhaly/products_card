import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonMakerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}
const ButtonMaker = (props: IButtonMakerProps) => {
  const { children, className, width = "w-fit", ...rest } = props;
  return (
    <button
      className={`p-2 text-white rounded-md ${width} ${className} `}
      {...rest}
    >
      {children}
    </button>
  );
};
export default ButtonMaker;
