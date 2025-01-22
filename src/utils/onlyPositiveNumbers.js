// * Func - input Number 유효성 검사
export const onlyPositiveNumbers = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};
