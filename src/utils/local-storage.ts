export const getLocalStorageItem = (itemKey: string) => {
  const json = localStorage.getItem(itemKey);
  return typeof json === "string" ? JSON.parse(json) : null;
}

export const setLocalStorageItem = (itemKey: string, itemValue: unknown) => {
  if (itemValue) {
    const json = JSON.stringify(itemValue);
    localStorage.setItem(itemKey, json);
  }
}

export const removeLocalStorageItem = (itemKey: string) => {
  const json = localStorage.getItem(itemKey);
  if (typeof json === "string") {
    localStorage.removeItem(itemKey);
  }
}