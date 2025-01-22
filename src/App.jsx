import React, { useState, useEffect } from "react";
import "./App.css";
import MedalForm from "./components/MedalForm";
import MedalList from "./components/MedalList";
import { validatePositiveNumber } from "./utils/validateInput";

function App() {
  const [userInputs, setUserInputs] = useState({
    nation: "",
    goldMedals: "",
    silverMedals: "",
    bronzeMedals: "",
  });

  const [submittedData, setSubmittedData] = useState([]);

  // * input 필드 초기화
  const initializeUserInputs = () => {
    setUserInputs({
      nation: "",
      goldMedals: "",
      silverMedals: "",
      bronzeMedals: "",
    });
  };

  // * 사용자가 입력한 값을 state에 업데이트
  const handleUserInputChange = (e) => {
    const { id, value, type } = e.target;

    if (type == "number" && !validatePositiveNumber(value)) {
      alert("메달 개수는 0보다 작을 수 없습니다.");
      return;
    }

    setUserInputs((prevState) => {
      return { ...prevState, [id]: value };
    });
    console.log("userInputs =====>", userInputs);
  };

  // * 데이터 출력 및 입력 폼 초기화
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (Object.values(userInputs).some((val) => val === "")) {
      alert("작성되지 않은 값이 있습니다.");
      return;
    }

    setSubmittedData((prevData) => {
      if (prevData.some((data) => data.nation === userInputs.nation)) {
        alert("이미 등록된 국가입니다. 업데이트를 이용해 주세요.");
        return prevData;
      } else {
        return [...prevData, userInputs];
      }
    });

    initializeUserInputs();
  };

  return (
    <section>
      <h1>2024 파리 올림픽</h1>
      <MedalForm
        handleUserInputChange={handleUserInputChange}
        handleFormSubmit={handleFormSubmit}
        userInputs={userInputs}
      />

      {submittedData.length <= 0 && (
        <p className="default-message">
          아직 추가된 국가가 없습니다. 메달을 추적하세요!
        </p>
      )}
      {submittedData.length > 0 && <MedalList userInputs={submittedData} />}
    </section>
  );
}

export default App;
