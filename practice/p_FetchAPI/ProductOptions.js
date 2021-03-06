export default function ProductOptions({ $target, initialState, onSelect }) {
  const $select = document.createElement("select");

  $target.appendChild($select);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const craeteProductFullName = ({ optionName, optionPrice, stock }) => {
    return `${optionName} ${
      optionPrice > 0 ? `(옵션가 ${optionPrice})` : ""
    } | ${stock > 0 ? `재고: ${stock}` : "재고없음"}`;
  };

  $select.addEventListener("change", (e) => {
    const optionId = parseInt(e.target.value);
    const option = this.state.find((option) => option.optionId === optionId); // 선택한 id에 해당하는 state

    // option을 잘 불러온 경우에만 onSelect
    if (option) {
      onSelect(option);
    }
  });

  this.render = () => {
    if (this.state && Array.isArray(this.state)) {
      $select.innerHTML = `
        <option value="">--선택하세요!--</option>
        ${this.state
          .map(
            (option) => `
              <option ${option.stock === 0 ? "disabled" : ""} 
              value="${option.optionId}">
              ${craeteProductFullName(option)}
              </option>`
          )
          .join("")}
      `;
    }
  };

  this.render();
}
