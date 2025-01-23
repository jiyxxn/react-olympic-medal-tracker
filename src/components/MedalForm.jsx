import React, { useState } from "react";
import InputText from "./InputText";
import Button from "./Button";
import { toast } from "react-toastify";

const MedalForm = ({ saveMedalList, updateMedalList }) => {
  const [country, setCountry] = useState({
    nation: "",
    goldMedals: "",
    silverMedals: "",
    bronzeMedals: "",
    sumOfMedals: "",
  });

  // * 사용자가 입력한 값을 country state에 업데이트
  const handleUserInputChange = (e) => {
    const { id, value } = e.target;

    // Number 입력 값 유효성 검증
    if (id.includes("Medals") && (isNaN(value) || value < 0)) {
      return false;
    }

    setCountry((prevState) => {
      const updatedCountry = { ...prevState, [id]: value };

      const goldCount = parseInt(updatedCountry.goldMedals) || 0;
      const silverCount = parseInt(updatedCountry.silverMedals) || 0;
      const bronzeCount = parseInt(updatedCountry.bronzeMedals) || 0;

      const sumOfMedals = goldCount + silverCount + bronzeCount;

      return { ...updatedCountry, sumOfMedals };
    });
  };

  // 입력 필드 초기화 양식
  const resetForm = () => {
    setCountry({
      nation: "",
      goldMedals: "",
      silverMedals: "",
      bronzeMedals: "",
      sumOfMedals: "",
    });
  };

  const validateAndSubmitForm = (e) => {
    e.preventDefault();

    // 입력 값 검증
    if (Object.values(country).some((val) => val === "")) {
      toast.error("작성되지 않은 값이 있습니다.");
      return false;
    }

    // 해당 국가 데이터 존재 여부 검증
    const storedCountries = JSON.parse(localStorage.getItem("medalList"));

    if (storedCountries) {
      const existsNation = storedCountries.some((item) => {
        return item.nation === country.nation;
      });

      if (existsNation) {
        toast.warning("이미 등록된 국가입니다. 업데이트를 이용해 주세요.");
        return false;
      }
    }

    saveMedalList(country);
    resetForm();
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
    },
    {
      label: "은메달",
      id: "silverMedals",
      value: country.silverMedals,
    },
    {
      label: "동메달",
      id: "bronzeMedals",
      value: country.bronzeMedals,
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
          value={input.value}
          onChange={(e) => handleUserInputChange(e)}
        />
      ))}

      <div className="button-wrapper">
        <Button text="국가 추가" type="submit" />
        <Button
          text="업데이트"
          type="button"
          onClick={() => {
            updateMedalList(country);
          }}
        />
      </div>
    </form>
  );
};

export default MedalForm;
