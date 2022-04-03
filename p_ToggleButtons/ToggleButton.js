//// 선언적 프로그래밍 방식으로 토글 버튼 만들기 ////

function TimerButton({ $target, text, timer = 3000 }) {
  const button = new ToggleButton({
    $target,
    text,
    onClick: () => {
      setTimeout(() => {
        button.setState({
          ...button.sate,
          toggled: !button.state.toggled,
        });
      }, timer);
    },
  });
}

function ToggleButton({ $target, text, onClick }) {
  const $button = document.createElement("button");
  $target.appendChild($button);
  let isInit = false;
  //   let clickCount = 0;

  this.state = {
    clickCount: 0,
    toggled: false,
  };

  this.setState = (nextSate) => {
    this.state = nextSate;
    this.render();
  };

  //   this.toggle = () => {
  //     if ($button.style.textDecoration === "") {
  //       $button.style.textDecoration = "line-through";
  //     } else {
  //       $button.style.textDecoration = "";
  //     }
  //   };

  this.render = () => {
    $button.textContent = text;

    $button.style.textDecoration = this.state.toggled ? "line-through" : "";
  };

  // if (!isInit) {
  $button.addEventListener("click", () => {
    this.setState({
      clickCount: this.state.clickCount + 1,
      toggled: !this.state.toggled,
    });
    // clickCount++;
    // this.toggle();
    if (onClick) {
      onClick(this.state.clickCount);
    }
  });
  isInit = true;
  // }

  this.render();
}

function ButtonGroup({ $target, buttons }) {
  const $group = document.createElement("div");
  let isInit = false;

  this.render = () => {
    if (!isInit) {
      buttons.forEach(({ type, ...props }) => {
        if (type === "toggle") {
          new ToggleButton({ $target: $group, ...props });
        } else if (type === "timer") {
          new TimerButton({ $target: $group, ...props });
        }
      });
      $target.appendChild($group);
      isInit = true;
    }
  };
  this.render();
}

const $app = document.querySelector("#app");

new ButtonGroup({
  $target: $app,
  buttons: [
    {
      type: "toggle",
      text: "토글 버튼1",
      onClick: (clickCount) => {
        if (clickCount % 3 === 0) {
          alert("3번째 클릭");
        }
      },
    },
    {
      type: "toggle",
      text: "토글 버튼2",
      onClick: (clickCount) => {
        if (clickCount % 2 === 0) {
          alert("2번째 클릭");
        }
      },
    },
    {
      type: "timer",
      text: "타이머",
      timer: 1000,
    },
  ],
});

// new ToggleButton({
//   $target: $app,
//   text: "Button1",
//   onClick: (clickCount) => {
//     if (clickCount % 3 === 0) {
//       alert("3번째 클릭");
//     }
//   },
// });

// new ToggleButton({
//   $target: $app,
//   text: "Button2",
//   onClick: (clickCount) => {
//     if (clickCount % 2 === 0) {
//       alert("2번째 클릭!!");
//     }
//   },
// });

// new ToggleButton({
//   $target: $app,
//   text: "Button3",
// });

// new TimerButton({
//   $target: $app,
//   text: "3초 뒤에 자동으로!",
// });

// new TimerButton({
//   $target: $app,
//   text: "10초 뒤에 자동으로!",
//   timer: 1000 * 10,
// });
