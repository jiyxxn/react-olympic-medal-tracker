import React from "react";

const InputText = ({ id, label, onChange, onKeyUp, value, ...props }) => {
  return (
    <label>
      {label}
      <input
        type="text"
        id={id}
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={value}
      />
    </label>
  );
};

export default InputText;
