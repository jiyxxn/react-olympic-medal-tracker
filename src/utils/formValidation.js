import { toast } from 'react-toastify';

// * input에 빈 값이 있는지 확인
export const checkEmptyFields = (inputs) => {
  // 입력값이 0인 경우를 제외한 falsy값 검증
  if (Object.values(inputs).some((value) => value !== 0 && !value)) {
    toast.error('작성되지 않은 값이 있습니다.');
    throw new Error('Some input fields are empty.');
  }
};

/* 기존 국가 데이터와 중복되는지 비교
    @param {event} e : 발생한 이벤트의 종류 확인
    @param {object} prevCountries : 기존에 등록된 국가 리스트
    @param {object} updatedCountry : input 필드의 state (새로 업데이트되는 value) */
export const checkExistCountry = (e, prevCountries, updatedCountry) => {
  if (!Array.isArray(prevCountries)) prevCountries = [];

  const existsCountry = prevCountries.some(
    (prevCountry) => prevCountry.nation === updatedCountry.nation
  );
  if (existsCountry && e.type === 'submit') {
    // 이미 등록된 국가를 등록하려는 경우
    const message = '이미 등록된 국가입니다. 업데이트를 이용해 주세요.';
    toast.warning(message);
    throw new Error(message);
  }

  if (!existsCountry && e.type !== 'submit') {
    // 등록되지 않은 국가를 업데이트하려는 경우
    const message = '등록되지 않은 국가입니다. 국가를 추가해 주세요.';
    toast.error(message);
    throw new Error(message);
  }
};

// * 숫자가 입력되어야 하는 필드에 문자와 음수, 선행 0 입력 방지
export const checkPositiveNumber = (type, inputId, value, validatedValue) => {
  if (inputId.includes(type)) {
    validatedValue = value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '');
  }
  return validatedValue; // 변환된 value값 리턴
};
