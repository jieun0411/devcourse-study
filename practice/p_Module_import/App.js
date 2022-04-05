// import App ~~ 으로 쓰기 위해 default를 썼다!
export default function App() {
  this.render = () => {
    alert("hello!");
  };
  this.render();
}

export const printToday = () => {
  console.log(new Date().toLocaleString());
};
