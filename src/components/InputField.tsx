import React, { type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ type, placeholder, value, onChange }: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mt-2 w-full rounded-lg border border-[#777] px-3 py-2 text-sm outline-none placeholder:text-[#ccc]"
    />
  );
};

export default InputField;
