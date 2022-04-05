// API 데이터 연동하는 작업 TIP
// API를 바로 붙이는 것보다는, 컴포넌트가 의도한대로 잘 랜더링되는지 먼저 체크!

export default function TodoList({ $target, initialState, onClick }) {
  const $element = document.createElement("div");
  $target.appendChild($element);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (Array.isArray(this.state)) {
      // map은 배열을 반환하기 때문에, 꼭 join을 잊지 말아야 합니다!
      $element.innerHTML = `
            <h1>jieun's TodoList<h1>
            <ul>
                ${this.state
                  .map(({ id, text }) => `<li data-id="${id}">${text}</li>`)
                  .join("")}
            </ul>
        `;

      $element.querySelectorAll("li").forEach(($li) => {
        $li.addEventListener("click", (e) => {
          const { id } = e.target.dataset;
          onClick(parseInt(id, 10));
        });
      });
    }
  };

  this.render();
}
