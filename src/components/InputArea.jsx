import React from "react";
import InputField from "./InputField";
import Button from "./Button";

const InputArea = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="medal-input-container" onSubmit={handleSubmit}>
      <InputField type="text" label="국가" id="nation" />
      <InputField type="number" label="금메달" id="goldMedal" />
      <InputField type="number" label="은메달" id="silverMedal" />
      <InputField type="number" label="동메달" id="bronzeMedal" />
      <div class="button-wrapper">
        <Button text="국가 추가" type="submit" />
        <Button text="업데이트" type="button" />
      </div>
    </form>
  );
};

export default InputArea;
