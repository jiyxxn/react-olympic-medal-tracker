import React from "react";

const Button = ({ type, text, ...props }) => {
  return (
    <>
      <button type={type}>{text}</button>
    </>
  );
};

export default Button;
