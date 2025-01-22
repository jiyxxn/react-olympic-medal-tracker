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

  // * 메달 정보를 로컬 스토리지에 저장
  const saveMedalList = (country) => {
    const newMedalList = [...medalList, country];
    updateLocalStorage(setMedalList, "medalList", newMedalList);
  };

  // * 해당 메달 정보를 로컬 스토리지에서 삭제
  const deleteMedalList = (country) => {
    alert("삭제가 완료되었습니다.");
    const updatedMedalList = medalList.filter(
      (item) => item.nation !== country.nation
    );
    updateLocalStorage(setMedalList, "medalList", updatedMedalList);
  };

  // * 메달 정보 업데이트
  const updateMedalList = (updatedCountry) => {
    const existsNation = medalList.some(
      (country) => country.nation === updatedCountry.nation
    );

    if (!existsNation) {
      alert("등록되지 않은 국가입니다. 국가를 추가해 주세요.");
      return;
    }

    const updatedMedalList = medalList.map((country) =>
      country.nation === updatedCountry.nation ? updatedCountry : country
    );

    updateLocalStorage(setMedalList, "medalList", updatedMedalList);
  };

  return (
    <section>
      <h1>2024 파리 올림픽</h1>
      <MedalForm
        saveMedalList={saveMedalList}
        updateMedalList={updateMedalList}
      />

      {medalList.length <= 0 && (
        <p className="default-message">
          아직 추가된 국가가 없습니다. 메달을 추적하세요!
        </p>
      )}
      {medalList.length > 0 && (
        <MedalList medalList={medalList} deleteMedalList={deleteMedalList} />
      )}
    </section>
  );
}

export default App;
