// params.$target : 해당 컴포넌트가 추가될 DOM 앨리먼트
// params.initialState : 해당 컴포넌트의 초기 상태 (todotext의 데이터)
export default function TodoList({ $target, initialState }) {
  // 컴포넌트 그리기 위한 기본 틀
  const $todoList = document.createElement("div"); // $가 붙은 변수는 DOM객체를 담은 변수라는 것을 명시적으로 표시한 것!
  $target.appendChild($todoList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // render 함수를 실행하면 현재 상태 기준으로 컴포넌트를 렌더링
  this.render = () => {
    $todoList.innerHTML = `
    <ul>
        ${this.state.map(({ text }) => `<li>${text}</li>`).join("")}
    </ul>
    `;
  };
  this.render();
}
