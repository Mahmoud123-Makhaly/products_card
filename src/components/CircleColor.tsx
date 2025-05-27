import type { HTMLAttributes } from "react";

interface ICircleColorProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
const CircleColor = (props: ICircleColorProps) => {
  const { color, ...rest } = props;
  return (
    <span
      className="w-4 h-4  marker:0 rounded-full cursor-pointer"
      style={{ backgroundColor: color }}
      {...rest}
    ></span>
  );
};
export default CircleColor;
