// * Func - input[type="number"] 검증
export const validatePositiveNumber = (value) => {
  if (!isNaN(value) && Number(value) >= 0) {
    return true;
  }
  return false;
};
