import React, { useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import MedalForm from "./components/MedalForm";
import MedalList from "./components/MedalList";
import { updateLocalStorage } from "./utils/updateLocalStorage";
import { ToastContainer, toast } from "react-toastify";

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
    toast.success(`${country.nation}이(가) 삭제되었습니다.`);
    const updatedMedalList = medalList.filter(
      (item) => item.nation !== country.nation
    );
    updateLocalStorage(setMedalList, "medalList", updatedMedalList);
  };

  // * 메달 정보 업데이트
  const updateMedalList = (updatedCountry) => {
    // 입력 값 검증
    if (Object.values(updatedCountry).some((value) => value === "")) {
      toast.error("작성되지 않은 값이 있습니다.");
      return false;
    }

    // 해당 국가 데이터 존재 여부 검증
    const existsNation = medalList.some(
      (country) => country.nation === updatedCountry.nation
    );

    if (!existsNation) {
      toast.error("등록되지 않은 국가입니다. 국가를 추가해 주세요.");
      return false;
    }

    const updatedMedalList = medalList.map((country) =>
      country.nation === updatedCountry.nation ? updatedCountry : country
    );

    toast.success(`${updatedCountry.nation}이(가) 업데이트되었습니다.`);
    updateLocalStorage(setMedalList, "medalList", updatedMedalList);
  };

  return (
    <>
      <section>
        <h1>2025 스파르타 올림픽 🏆</h1>
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
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
