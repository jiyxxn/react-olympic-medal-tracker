import React, { useState } from "react";
import "./App.css";
import MedalForm from "./components/MedalForm";
import MedalList from "./components/MedalList";
import { updateLocalStorage } from "./utils/updateLocalStorage";

function App() {
  const storedCountries = JSON.parse(localStorage.getItem("medalList"));

  const [medalList, setMedalList] = useState(() => {
    return storedCountries ?? [];
  });

  // * 로컬 스토리지에 저장
  const saveMedalList = (country) => {
    const newMedalList = [...medalList, country];
    updateLocalStorage(setMedalList, "medalList", newMedalList);
  };

  return (
    <section>
      <h1>2024 파리 올림픽</h1>
      <MedalForm saveMedalList={saveMedalList} />

      {medalList.length <= 0 && (
        <p className="default-message">
          아직 추가된 국가가 없습니다. 메달을 추적하세요!
        </p>
      )}
      {medalList.length > 0 && <MedalList medalList={medalList} />}
    </section>
  );
}

export default App;
