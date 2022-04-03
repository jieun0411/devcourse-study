// () 즉시 실행함수로 감싼 것!
(() => {
  document.querySelectorAll(".toolbar button").forEach((element) => {
    element.addEventListener("click", (e) => {
      const command = e.target.getAttribute("data-command");
      document.execCommand(command);
    });
  });

  //   document.querySelector(".bold").addEventListener("click", () => {
  //     document.execCommand("bold");
  //   });

  //   document.querySelector(".italic").addEventListener("click", () => {
  //     document.execCommand("italic");
  //   });

  //   document.querySelector(".align-left").addEventListener("click", () => {
  //     document.execCommand("justifyLeft");
  //   });

  //   document.querySelector(".align-center").addEventListener("click", () => {
  //     document.execCommand("justifyCenter");
  //   });

  //   document.querySelector(".align-right").addEventListener("click", () => {
  //     document.execCommand("justifyRight");
  //   });
})();
