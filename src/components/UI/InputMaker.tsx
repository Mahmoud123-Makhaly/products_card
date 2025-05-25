/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { InputHTMLAttributes } from "react";

interface IInputMakerProps extends InputHTMLAttributes<HTMLInputElement> {}
const InputMaker = (props: IInputMakerProps) => {
  const { ...rest } = props;
  return (
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-indigo-500 shadow-lg"
      {...rest}
    />
  );
};
export default InputMaker;
