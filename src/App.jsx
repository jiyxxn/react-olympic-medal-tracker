import React, { useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import MedalForm from "./components/MedalForm";
import MedalList from "./components/MedalList";
import { updateLocalStorage } from "./utils/updateLocalStorage";
import { ToastContainer, toast } from "react-toastify";
import { checkEmptyFields, checkExistCountry } from "./utils/formValidation";

function App() {
  // * 로컬 스토리지에 저장된 국가 메달 리스트
  const storedCountries = JSON.parse(localStorage.getItem("medalList"));

  // * 국가 메달 리스트 state
  const [medalList, setMedalList] = useState(() => {
    return storedCountries ?? [];
  });

  /* 메달 정보를 로컬 스토리지에 저장
    @param {object} country : input 필드의 state 
  */
  const saveMedalList = (country) => {
    const newMedalList = [...medalList, country];
    updateLocalStorage(setMedalList, "medalList", newMedalList);
    toast.success(`${country.nation}이(가) 등록되었습니다.`);
  };

  /* 메달 정보를 로컬 스토리지에서 삭제
    @param {object} country : 삭제 버튼이 있는 row의 국가 정보 */
  const deleteMedalList = (country) => {
    const updatedMedalList = medalList.filter(
      (item) => item.nation !== country.nation
    );
    updateLocalStorage(setMedalList, "medalList", updatedMedalList);
    toast.success(`${country.nation}이(가) 삭제되었습니다.`);
  };

  /* 메달 정보 업데이트
    @param {event} e : 유효성 검증 시 사용되는 이벤트 종류
    @param {object} updatedCountry : input 필드의 state */
  const updateMedalList = (e, updatedCountry) => {
    try {
      checkEmptyFields(updatedCountry); // 입력 필드가 비어있을 시 throw error
      checkExistCountry(e, medalList, updatedCountry); // 등록되지 않은 국가를 update할 시 throw error

      const updatedMedalList = medalList.map((country) =>
        country.nation === updatedCountry.nation ? updatedCountry : country
      );

      toast.success(`${updatedCountry.nation}이(가) 업데이트되었습니다.`);
      updateLocalStorage(setMedalList, "medalList", updatedMedalList);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
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
