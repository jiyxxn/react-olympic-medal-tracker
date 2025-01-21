import React, { useState } from "react";
import "./App.css";
import InputArea from "./components/InputArea";
import ListArea from "./components/ListArea";
import { validatePositiveNumber } from "./utils/validateInput";

function App() {
  const [userInputs, setUserInputs] = useState({
    nation: "",
    goldMedals: "",
    silverMedals: "",
    bronzeMedals: "",
  });

  const [submittedData, setSubmittedData] = useState([]);

  const initializeUserInputs = () => {
    setUserInputs({
      // state 초기화
      nation: "",
      goldMedals: "",
      silverMedals: "",
      bronzeMedals: "",
    });
  };

  const getUserInputs = (e) => {
    const { id, value, type } = e.target;

    if (type == "number" && !validatePositiveNumber(value)) {
      alert("메달 개수는 0보다 작을 수 없습니다.");
      return;
    }
    setUserInputs((prevState) => {
      return { ...prevState, [id]: value };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setSubmittedData((prevData) => {
      if (prevData.some((data) => data.nation === userInputs.nation)) {
        alert("이미 등록된 국가입니다. 업데이트를 이용해 주세요.");
        return [...prevData];
      } else {
        return [...prevData, userInputs];
      }
    });
    initializeUserInputs();
  };

  return (
    <section>
      <h1>2024 파리 올림픽</h1>
      <InputArea
        getUserInputs={getUserInputs}
        handleFormSubmit={handleFormSubmit}
        userInputs={userInputs}
      />
      {submittedData && <ListArea userInputs={submittedData} />}
    </section>
  );
}

export default App;
