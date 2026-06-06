export const checkLocalStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return true;
  }
  return false;
};
