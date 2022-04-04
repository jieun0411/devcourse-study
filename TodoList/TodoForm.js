function TodoForm({ $target, onSubmit }) {
  const $form = document.createElement("form");

  $target.appendChild($form);

  let isInit = false;

  this.render = () => {
    $form.innerHTML = `
            <input type="text" name="todo" />
            <button>ADD</button> 
    `; // button에는 기본적으로 type="submit"이 들어가있다!

    if (!isInit) {
      $form.addEventListener("submit", (e) => {
        e.preventDefault(); // 태그가 가지고 있는 고유의 기능을 끊은 것!

        const $todo = $form.querySelector("input[name=todo]");
        const text = $todo.value;

        if (text.length > 0) {
          $todo.value = ""; // todo 추가 후 input 비우도록
          onSubmit(text);
        }
      });
      isInit = true;
    }
  };
  this.render();
}
