// 로컬 스토리지에 업데이트
export const updateLocalStorage = (setList, storageKey, updatedList) => {
  setList(updatedList);
  localStorage.setItem(storageKey, JSON.stringify(updatedList));
};
