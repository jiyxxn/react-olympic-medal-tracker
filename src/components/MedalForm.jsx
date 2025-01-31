import React, { useState } from 'react';
import InputText from './InputText';
import Button from './Button';
import {
  checkEmptyFields,
  checkExistCountry,
  checkPositiveNumber,
} from './../utils/formValidation';
import { calculateTotalMedals } from './../utils/calculateTotalMedals';

const MedalForm = ({ saveMedalList, updateMedalList }) => {
  // * input 필드 state
  const [country, setCountry] = useState({
    nation: '',
    goldMedals: '',
    silverMedals: '',
    bronzeMedals: '',
    sumOfMedals: '',
  });

  // 입력 필드 초기화 양식
  const resetForm = () => {
    setCountry({
      nation: '',
      goldMedals: '',
      silverMedals: '',
      bronzeMedals: '',
      sumOfMedals: '',
    });
  };

  // * setCountry - country state 업데이트
  const handleUserInputChange = (e) => {
    const { id, value } = e.target;

    let validatedValue = value;
    validatedValue = checkPositiveNumber('Medals', id, value, validatedValue);

    setCountry((prevState) => {
      const updatedCountry = { ...prevState, [id]: validatedValue };
      const sumOfMedals = calculateTotalMedals(updatedCountry);
      return { ...updatedCountry, sumOfMedals };
    });
  };

  /* 국가 등록 이벤트(submit) 처리
    @param {event} e : submit 이벤트 방지 및 유효성 검증 시 이벤트 종류 확인용 */
  const validateAndSubmitForm = (e) => {
    e.preventDefault();

    try {
      checkEmptyFields(country); // 입력 필드가 비어있을 시 throw error

      const storedCountries = JSON.parse(localStorage.getItem('medalList'));
      checkExistCountry(e, storedCountries, country); // 이미 등록된 국가를 재등록 하는 경우 throw error

      saveMedalList(country);
      resetForm(); // 입력 필드 초기화
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  /* 메달 정보 업데이트 및 입력 필드 초기화
    updateCountry 함수를 부모 컴포넌트로부터 받아와 실행
   */
  const updateCountry = (e) => {
    const isSuccess = updateMedalList(e, country);
    if (isSuccess) resetForm();
  };

  // * input 필드 리스트
  const inputList = [
    {
      label: '국가',
      id: 'nation',
      value: country.nation,
    },
    {
      label: '금메달',
      id: 'goldMedals',
      value: country.goldMedals,
    },
    {
      label: '은메달',
      id: 'silverMedals',
      value: country.silverMedals,
    },
    {
      label: '동메달',
      id: 'bronzeMedals',
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
          className="btn-update"
          text="업데이트"
          type="button"
          onClick={(e) => {
            updateCountry(e);
          }}
        />
      </div>
    </form>
  );
};

export default MedalForm;
