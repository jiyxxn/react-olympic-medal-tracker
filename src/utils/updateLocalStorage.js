export const updateLocalStorage = (setList, storageKey, updatedList) => {
  setList(updatedList);
  localStorage.setItem(storageKey, JSON.stringify(updatedList));
};
