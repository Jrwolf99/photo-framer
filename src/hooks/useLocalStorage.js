import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  try {
    const saved = localStorage.getItem(key);
    if (saved === null || saved === undefined) {
      return defaultValue;
    }
    return JSON.parse(saved);
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

  useEffect(() => {
    try {
      if (value === undefined || value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.storageArea === localStorage && event.key === key) {
        try {
          const newValue =
            event.newValue === null || event.newValue === undefined
              ? defaultValue
              : JSON.parse(event.newValue);
          if (JSON.stringify(value) !== JSON.stringify(newValue)) {
            setValue(newValue);
          }
        } catch (error) {
          console.error(
            `Error parsing storage event newValue for key "${key}":`,
            error,
          );
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, value, defaultValue]);

  return [value, setValue];
};
