// App 컴포넌트: page 컴포넌트 생성, route 함수 이용해서 pathname 기준으로 뭘 그릴지

import HomePage from "./pages/HomePage.js";
import ProductPage from "./pages/ProductPage.js";

export default function App({ $target }) {
  const homePage = new HomePage({ $target });
  const productPage = new ProductPage({ $target, initialState: {} });

  this.route = () => {
    // 여기서 pathname에 따라 page component 렌더링 처리
    const { pathname } = location;

    $target.innerHTML = ""; // 초기화
    if (pathname === "/") {
      // HomePage 그리기
      homePage.render();
    } else if (pathname.indexOf("/products/") > -1) {
      // Productpage 그리기
      // url에서 productId 뽑기
      // const productId = pathname.split('/products/')[1]
      // /products/1
      const [, , productId] = pathname.split("/");
      productPage.setState({
        productId,
      });
    } else {
      //404 처리?
      $target.innerHTML = "<h1>404 Not Found!</h1>";
    }
  };

  this.init = () => {
    this.route();
  };

  window.addEventListener("click", (e) => {
    if (e.target.className === "link") {
      e.preventDefault(); // 기존에 있던 a태그의 화면 이동 성질을 멈추게 한다.
      const { href } = e.target;
      history.pushState(null, null, href.replace(location.origin, "")); // pushState 이용하여 화면의 이동 없이 url만 고친다.
      this.route();
    }
  });
  window.addEventListener("popstate", () => this.route()); // popstate로 뒤로가기, 앞으로가기로 route 호출하여 바뀐 화면 그리기

  // App 컴포넌트 생성되자마자 init으로 rout 호출하여 현재 url에 맞는 page 그린다.
  this.init();
}
