// import * as constants from "./constants.js"; // (1) 모두 꺼내오게 됩니당
import { DOMAIN_NAME as DN, PORT as PT } from "./constants.js";
// import App from "./App.js"; // App을 쓰려면 default가 있어야 한다.
import App, { printToday } from "./App.js";

// console.log(constants);

const $body = document.querySelector("body");
// $body.innerHTML = $body.innerHTML + JSON.stringify(constants, null, 2); // (1) 모두 꺼내오게 됩니당
// $body.innerHTML = $body.innerHTML + `<div>${DOMAIN_NAME}</div>`; // (2) as 쓰기 전!
// $body.innerHTML = $body.innerHTML + `<div>${PORT}</div>`; // (2) as 쓰기 전!
$body.innerHTML = $body.innerHTML + `<div>${DN}</div>`;
$body.innerHTML = $body.innerHTML + `<div>${PT}</div>`;

printToday();
new App();
