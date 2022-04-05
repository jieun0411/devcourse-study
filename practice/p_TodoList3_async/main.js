/* 컴포넌트에 더미값 넣어서 랜더링 확인
import TodoList from "./TodoList.js";
import TodoComments from "./TodoComments.js";

const $app = document.querySelector(".app");

new TodoList({
  $target: $app,
  initialState: [{ text: "아몰랑" }, { text: "으아아아아ㅏㅏ아ㅏㅇㄱ" }],
});

new TodoComments({
  $target: $app,
  initialState: {
    selectedTodo: {
      text: "본문이여",
    },
    comments: [
      {
        text: "이건 댓글이여",
      },
      {
        text: "댓글이라고오",
      },
    ],
  },
});

*/

import App from "./App.js";

const $app = document.querySelector(".app");

new App({ $app });
