import React, { useState } from "react";
import { InputStyled } from "./styles";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ type, placeholder, value, onChange, className, emoji }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputStyled $showEmoji={!!emoji}>
      {emoji && <span className="emoji">{emoji}</span>}
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
      {type === "password" && (
        <span className="icon" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </InputStyled>
  );
};

export default Input;
