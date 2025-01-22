import React from "react";

const Button = ({ type, text, className, onClick, ...props }) => {
  return (
    <>
      <button type={type} className={className} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
