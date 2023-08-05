import React, { InputHTMLAttributes } from "react";

// eslint-disable-next-line react/display-name
const Input = ({
  className = "",
  sizeClass = "h-11 px-4 py-3",
  fontClass = "text-sm font-normal",
  rounded = "rounded-2xl",
  placeholder = "",
  type = "text",
}) => {
  return (
    <input
      type={type}
      className={`text-black block w-full focus:ring focus:ring-opacity-50 bg-white border-neutral-700 focus:ring-primary-600 focus:ring-opacity-25 bg-neutral-900 disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
