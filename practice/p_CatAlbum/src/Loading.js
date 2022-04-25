export default function Loading({ $target }) {
  const $loading = document.createElement("div");
  $loading.className = "Loading Modal";

  $target.appendChild($loading);
  this.state = false;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $loading.innerHTML = `
        <div class="content">
            <img width="100%" src="https://cdn.roto.codes/images/nyan-cat.gif" alt="Loading..." />
        </div>
    `;

    // 로딩 중이면 보이고, 로딩 중이 아니면 안보이도록
    $loading.style.display = this.state ? "block" : "none";
  };

  this.render();
}
