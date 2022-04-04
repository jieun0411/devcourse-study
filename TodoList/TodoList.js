// params.$target : 해당 컴포넌트가 추가될 DOM 앨리먼트
// params.initialState : 해당 컴포넌트의 초기 상태 (todotext의 데이터)
function TodoList({ $target, initialState }) {
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
    /*
     * this.state = [{ text: '자바스크립트 공부하기;' }, { text: '....' }]
     *
     * map을 돌고나서는 아래처럼 만들어집니다.
     *
     * this.state.map(todo => `<li>${todo.text}</li>`)
     * [{ text: '자바스크립트 공부하기' }, { text: '....' }]
     * ['<li>자바스크립트 공부하기</li>', '<li>....</li>']
     *
     * join('') 후에는 아래처럼 만들어집니다.
     * <li>자바스크립트 공부하기</li><li>....</li>
     */
    $todoList.innerHTML = `
    <ul>
        ${this.state.map(({ text }) => `<li>${text}</li>`).join("")}
    </ul>
    `;
  };
  this.render();
}
