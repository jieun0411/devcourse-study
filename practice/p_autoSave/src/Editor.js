export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  const $editor = document.createElement("div");

  let isinitialize = false;
  this.state = initialState;

  $editor.style.width = "600px";
  $editor.style.height = "600px";

  $target.appendChild($editor);

  this.setState = (nextState) => {
    // console.log(nextState);
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").innerHTML =
      this.state.content.replace(/\n/g, "<br>");

    // 서버에서 내려오는 개행값: \n
    // textarea에서는 \n으로 개행 처리해준다.

    this.render();
  };

  this.render = () => {
    if (!isinitialize) {
      $editor.innerHTML = `
      <input type="text" name="title" style="width:600px;" value="${this.state.title}" />
      <div name="content" contentEditable="true" style="width:600px;height:400px;border: 1px solid black; padding: 8px">${this.state.content}</div>
      `;
      isinitialize = true;
    }
    $editor.value = this.state;
  };
  this.render();

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };

    this.setState(nextState);
    onEditing(this.state);
  });

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    console.log(e.target.innerHTML);
  });
}
