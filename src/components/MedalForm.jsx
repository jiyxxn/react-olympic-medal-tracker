import React, { useState, useEffect } from "react";
import InputText from "./InputText";
import Button from "./Button";
import { onlyPositiveNumbers } from "../utils/onlyPositiveNumbers";

const MedalForm = ({ saveMedalList }) => {
  const [country, setCountry] = useState({
    nation: "",
    goldMedals: "",
    silverMedals: "",
    bronzeMedals: "",
  });

  // * 사용자가 입력한 값을 state에 업데이트
  const handleUserInputChange = (e) => {
    const { id, value } = e.target;

    setCountry((prevState) => {
      return { ...prevState, [id]: value };
    });
  };

  const validateAndSubmitForm = (e) => {
    e.preventDefault();

    if (Object.values(country).some((val) => val === "")) {
      alert("작성되지 않은 값이 있습니다.");
      return;
    }
    const storedCountries = JSON.parse(localStorage.getItem("medalList"));

    if (storedCountries) {
      const hasSameNation = storedCountries.some((item) => {
        return item.nation === country.nation;
      });

      if (hasSameNation) {
        alert("이미 등록된 국가입니다. 업데이트를 이용해 주세요.");
        return;
      }
    }

    saveMedalList(country);
  };

  const inputList = [
    {
      label: "국가",
      id: "nation",
      value: country.nation,
    },
    {
      label: "금메달",
      id: "goldMedals",
      value: country.goldMedals,
      onKeyUp: onlyPositiveNumbers,
    },
    {
      label: "은메달",
      id: "silverMedals",
      value: country.silverMedals,
      onKeyUp: onlyPositiveNumbers,
    },
    {
      label: "동메달",
      id: "bronzeMedals",
      value: country.bronzeMedals,
      onKeyUp: onlyPositiveNumbers,
    },
  ];

  return (
    <form
      className="medal-input-container"
      onSubmit={(e) => {
        validateAndSubmitForm(e);
      }}
    >
      {inputList.map((input) => (
        <InputText
          key={input.id}
          id={input.id}
          label={input.label}
          onChange={(e) => handleUserInputChange(e)}
          onKeyUp={(e) => (input.onKeyUp ? input.onKeyUp(e) : () => {})}
        />
      ))}

      <div className="button-wrapper">
        <Button text="국가 추가" type="submit" />
        <Button text="업데이트" type="button" />
      </div>
    </form>
  );
};

export default MedalForm;
