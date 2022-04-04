// 여기에서만 localStorage에 접근하도록 합니다

const storage = (function (storage) {
  const setItem = (key, value) => {
    try {
      storage.setItem(key, value);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getItem = (key, defaultValue) => {
    try {
      const storedValue = storage.getItem(key);

      if (storedValue) {
        return JSON.parse(storeValue);
      }
      return defaultValue;
    } catch (e) {
      console.log(e.message);
      return defaultValue;
    }
  };

  return {
    setItem,
    getItem,
  };
})(window.localStorage);
