import React from "react";
import { Btn } from "./styles";

const Button = ({ children, onClick, type = "button", className }) => {
  return (
    <Btn onClick={onClick} type={type} className={className}>
      {children}
    </Btn>
  );
};

export default Button;
