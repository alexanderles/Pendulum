import React, { ReactNode } from "react";
import { FC } from "react";

const FormItem = ({ children, className = "", label }) => {
  return (
    <div className={className}>
      {label}
      <div className="mt-1.5">{children}</div>
    </div>
  );
};

export default FormItem;
