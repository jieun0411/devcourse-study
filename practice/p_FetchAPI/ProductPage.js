import ProductOptions from "./ProductOptions.js";
import Cart from "./Cart.js";
import { request } from "./api.js";

/*
 * state 구조
 * {
 *    productId: 1,
 *    product: Product,
 *    optionData: [],
 *    selecteOption: []
 * }
 */

export default function ProductPage({ $target, initialState }) {
  const $product = document.createElement("div");

  $target.appendChild($product);

  this.state = initialState;

  const productOptions = new ProductOptions({
    $target: $product,
    initialState: [],
    onSelect: (option) => {
      const nextState = { ...this.state };
      const { selectedOptions } = nextState;
      const selectedOptionIndex = selectedOptions.findIndex(
        (selectedOption) => selectedOption.optionId === option.optionId
      );
      if (selectedOptionIndex > -1) {
        nextState.selectedOptions[selectedOptionIndex].ea++;
      } else {
        nextState.selectedOptions.push({
          optionId: option.optionId,
          optionName: option.optionName,
          optionPrice: option.optionPrice,
          ea: 1,
        });
      }
      this.setState(nextState);
    },
  });

  const cart = new Cart({
    $target: $product,
    initialState: {
      productName: "",
      basePrice: 0,
      selectedOptions: [],
    },
    onRemove: (selectedOptionIndex) => {
      const nextState = { ...this.state };
      nextState.selectedOptions.splice(selectedOptionIndex, 1);

      this.setState(nextState);
    },
  });

  this.setState = (nextState) => {
    if (nextState.productId !== this.state.productId) {
      fetchOptionDate(nextState.productId);
      return;
    }

    this.state = nextState;

    const { product, selectedOptions, optionData } = this.state;
    productOptions.setState(optionData);
    cart.setState({
      productName: product.name,
      basePrice: product.basePrice,
      selectedOptions: selectedOptions,
    });
  };

  this.render = () => {};

  this.render();

  const fetchOptionData = (productId) => {
    return request(`/products/${productId}`)
      .then((product) => {
        this.setState({
          ...this.state,
          product,
          optionData: [],
          selectedOptions: [],
        });
        return request(`/product-options?product.id=${product.id}`);
      })
      .then((productOptions) => {
        // promise.all로 한 번 더 감싸서, productOptions와 productOpions의 stock 데이터를 동시에 가져온다.
        return Promise.all([
          Promise.resolve(productOptions),
          Promise.all(
            productOptions
              .map((productOption) => productOption.id)
              .map((id) => {
                return request(`/product-option-stocks?productOption.id=${id}`);
              })
          ),
        ]);
      }) // 데이터 만들기!
      .then((data) => {
        const [productOptions, stocks] = data;
        const optionData = productOptions.map((productOption, i) => {
          const stock = stocks[i][0].stock;

          return {
            optionId: productOption.id,
            optionName: productOption.optionName,
            optionPrice: productOption.optionPrice,
            stock,
          };
        });

        this.setState({
          ...this.state,
          optionData,
        });
      });
  };

  fetchOptionData(this.state.productId);
}
