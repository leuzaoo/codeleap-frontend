import { TextareaHTMLAttributes, ChangeEvent, FC } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const TextAreaField: FC<Props> = ({
  value,
  onChange,
  placeholder = "",
  rows = 4,
  ...rest
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="mt-2 w-full rounded-lg border border-[#999] px-3 py-2 text-sm outline-none placeholder:text-[#ccc] focus:ring-2 focus:ring-blue-400"
      {...rest}
    />
  );
};

export default TextAreaField;
