export default function ImageViewer({ $target, onClose }) {
  const $imageViewer = document.createElement("div");
  $imageViewer.className = "ImageViewer Modal";
  $target.appendChild($imageViewer);

  this.state = {
    selectedImageUrl: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    // imageUrl 있으면 보이도록, 없으면 안보이도록
    $imageViewer.style.display = this.state.selectedImageUrl ? "block" : "none";

    $imageViewer.innerHTML = `
            <div class="content">
                <img src="${this.state.selectedImageUrl}" />
            </div>
        `;
  };

  this.render();

  window.addEventListener("keyup", (e) => {
    // 누른 키가 esc인 경우, onClose 호출
    if (e.key === "Escape") {
      onClose();
    }
  });

  $imageViewer.addEventListener("click", (e) => {
    // Modal이 있는 경우 (Modal을 누른 경우)
    // includes는 Array에 있는 함수이기 때문에 배열로 변환
    if (Array.from(e.target.classList).includes("Modal")) {
      onClose();
    }
  });
}
