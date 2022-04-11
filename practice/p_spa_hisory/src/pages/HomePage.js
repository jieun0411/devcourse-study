import { request } from "../api.js";

export default function HomePage({ $target }) {
  const $home = document.createElement("div");

  this.render = () => {
    request("/products").then((products) => {
      $home.innerHTML = `
                <h1>Home Page</h1>
                <ul>
                    ${products
                      .map(
                        (product) => `
                    <li>
                        <a class="link" href="/products/${product.id}">
                        ${product.name}
                        </a>
                    </li>
                    `
                      )
                      .join("")}
                </ul>            
            `;

      $target.appendChild($home);
    });
  };
  // 생성시 바로 render되는 것이 아니라, App.js에서 route 함수의 로직에 따라 렌더링 할지 말지
}
