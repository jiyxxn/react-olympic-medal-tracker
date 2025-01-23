// * 메달 합산 함수
export const calculateTotalMedals = (country) => {
  const goldCount = parseInt(country.goldMedals) || 0;
  const silverCount = parseInt(country.silverMedals) || 0;
  const bronzeCount = parseInt(country.bronzeMedals) || 0;

  return goldCount + silverCount + bronzeCount;
};
