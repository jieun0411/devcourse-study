export default function TodoList({
  $target,
  initialState,
  onToggle,
  onRemove,
}) {
  const $todo = document.createElement("div");

  $target.appendChild($todo);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isLoading, todos } = this.state;

    if (!isLoading && todos.length === 0) {
      $todo.innerHTML = `todo가 없습니다`;
      return;
    }
    $todo.innerHTML = `
        <ul>
            ${todos
              .map(
                ({ _id, content, isCompleted }) => `
                <li data-id="${_id}" class="todo-item">
                ${isCompleted ? `<s>${content}</s>` : content}
                    <button class="remove">X</button>
                </li>
            `
              )
              .join("")}
        <ul/>
    `;
  };

  $todo.addEventListener("click", (e) => {
    const $li = e.target.closest(".todo-item");

    if ($li) {
      const { id } = $li.dataset; // dataset으로 data 접두사가 붙은 것들을 가져옵니당

      // e.target으로 실제 이벤트를 발생시킨 곳이 어디인지 찾습니당
      const { className } = e.target;
      if (className === "remove") {
        onRemove(id);
      } else {
        onToggle(id);
      }
    }
  });
  this.render();
}
