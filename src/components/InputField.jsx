import React from "react";

const InputField = ({ type, label, id, onChange, value, ...props }) => {
  return (
    <label htmlFor={id}>
      {label}
      <input type={type} id={id} onChange={onChange} value={value} />
    </label>
  );
};

export default InputField;
