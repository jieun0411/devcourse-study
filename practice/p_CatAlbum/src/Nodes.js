// Nodes.js : 노드를 클릭 했을 때 onClick을 호출하기만 하고, 어떤 노드를 클릭했는지를 넘겨준다.

export default function Nodes({ $target, initialState, onClick, onPrevClick }) {
  const $nodes = document.createElement("div");
  $target.appendChild($nodes);
  $nodes.classList.add("nodes");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isRoot, nodes } = this.state;
    $nodes.innerHTML = `
    ${
      isRoot
        ? ""
        : `
      <div class="Node">
        <img src="https://cdn.roto.codes/images/prev.png">
      </div>
    `
    }
    ${nodes
      .map(
        (node) => `
        <div class="Node" data-id="${node.id}">
          <img src="${
            node.type === "DIRECTORY"
              ? "https://cdn.roto.codes/images/directory.png"
              : "https://cdn.roto.codes/images/file.png"
          }">
          ${node.name}
        </div>
    `
      )
      .join("")}
  `;
  };

  this.render();

  $nodes.addEventListener("click", (e) => {
    const $node = e.target.closest(".Node"); // 이미지, node.name 클릭하면 Node 가져오기

    const { id } = $node.dataset;

    // id가 없는 경우 === 뒤로가기 누른 경우!
    if (!id) {
      // 뒤로가기 클릭 처리
    }

    const node = this.state.nodes.find((node) => node.id === id);

    // 방어코드
    if (node) {
      onClick(node);
    } else {
      onPrevClick();
    }
  });
}
