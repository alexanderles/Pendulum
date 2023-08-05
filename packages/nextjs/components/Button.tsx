import React from "react";
import Link from "next/link";

const Button: any = ({
  sizeClass = "py-3 px-4 sm:py-3.5 sm:px-6",
  fontSize = "text-sm sm:text-base font-medium",
  disabled = false,
  type,
  children,
  href,
  onClick = () => {},
}) => {
  const CLASSES = `bg-purple-500 hover:bg-purple-800 text-slate-50 h-auto inline-flex items-center justify-center rounded-full transition-colors ${fontSize} ${sizeClass} `;

  if (!!href) {
    return (
      <Link href={href} className={`${CLASSES} `} onClick={onClick}>
        {children || `This is Link`}
      </Link>
    );
  }

  return (
    <button className={`${CLASSES}`} onClick={onClick} type={type}>
      {children || `This is Button`}
    </button>
  );
};

export default Button;
