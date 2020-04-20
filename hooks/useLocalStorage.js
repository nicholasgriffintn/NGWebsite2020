import { useState } from "react";

export const useLocalStorage = (key, initialValue, options = {}) => {
  const { deleteKeyIfValueIs = null } = options;

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof localStorage !== `undefined`) {
      document.addEventListener(`localStorage:${key}Change`, (event) =>
        setStoredValue(event.detail)
      );

      const item = localStorage[key];

      if (!item) {
        localStorage[key] = JSON.stringify(initialValue);
      }
      return item ? JSON.parse(item) : initialValue;
    }

    return initialValue;
  });

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    const event = new CustomEvent(`localStorage:${key}Change`, {
      detail: valueToStore,
    });
    document.dispatchEvent(event);
    if (value === deleteKeyIfValueIs) {
      delete localStorage[key];
    } else {
      localStorage[key] = JSON.stringify(valueToStore);
    }
  };
  return [storedValue, setValue];
};
