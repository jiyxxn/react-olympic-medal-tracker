import React, { useRef } from "react";
import InputField from "./InputField";
import Button from "./Button";

const InputArea = ({ getUserInputs, handleFormSubmit, userInputs }) => {
  return (
    <form className="medal-input-container" onSubmit={handleFormSubmit}>
      <InputField
        type="text"
        label="국가"
        id="nation"
        onChange={getUserInputs}
        value={userInputs.nation}
      />
      <InputField
        type="number"
        label="금메달"
        id="goldMedals"
        onChange={getUserInputs}
        value={userInputs.goldMedals}
      />
      <InputField
        type="number"
        label="은메달"
        id="silverMedals"
        onChange={getUserInputs}
        value={userInputs.silverMedals}
      />
      <InputField
        type="number"
        label="동메달"
        id="bronzeMedals"
        onChange={getUserInputs}
        value={userInputs.bronzeMedals}
      />
      <div className="button-wrapper">
        <Button text="국가 추가" type="submit" />
        <Button text="업데이트" type="button" />
      </div>
    </form>
  );
};

export default InputArea;
