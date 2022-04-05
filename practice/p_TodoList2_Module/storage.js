// 전역 오염을 최소화시키고, storage라는 name space만을 노출시키기 위해 IIFE 방식으로 구현했지만
// import를 사용하면 이제는 그럴 필요가 없습니다!

const storage = window.localStorage;

export const setItem = (key, value) => {
  try {
    storage.setItem(key, value);
  } catch (e) {
    console.log(e.message);
  }
};

export const getItem = (key, defaultValue) => {
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
