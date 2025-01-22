import React from "react";

const Button = ({ type, text, className, ...props }) => {
  return (
    <>
      <button type={type} className={className}>
        {text}
      </button>
    </>
  );
};

export default Button;
