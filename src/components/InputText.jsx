import React from "react";

const InputText = ({ id, label, onChange, value, ...props }) => {
  return (
    <label>
      {label}
      <input type="text" id={id} onChange={onChange} value={value} />
    </label>
  );
};

export default InputText;
