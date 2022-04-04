const data = [
  { text: "과제 확인하기" },
  { text: "눈물닦기" },
  { text: "얌전히 과제하기" },
];

const $app = document.querySelector(".app");

new App({
  $target: $app,
  initialState: data,
});
