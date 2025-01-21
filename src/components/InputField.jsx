import React from "react";

const InputField = ({ type, label, id, ...props }) => {
  return (
    <label htmlFor={id}>
      {label} <input type={type} id={id} />
    </label>
  );
};

export default InputField;
