/*
initialState: [
    {
        id: 1,
        imagePath: ''
    }
]
*/

export default function PhotoList({ $target, initialState, onScrollEnded }) {
  let isInitialize = false;

  const $photoList = document.createElement("div");
  $target.appendChild($photoList);
  this.state = initialState;

  // IntersectionObserver ()
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // isIntersecting: 화면에 보이는지 확인
        if (entry.isIntersecting && !this.state.isLoading) {
          console.log("화면 끝!", entry);
          // 방어코드
          if (this.state.totalCount > this.state.photos.length) {
            onScrollEnded();
          }
        }
      });
    },
    {
      // root: null, // 감시할 요소 제한 (기본은 null)
      rootMargin: "0px 0px -200px 0px",
      thresholds: 0.5,
    }
  );

  let $lastLi = null; // 처음에는 렌더링이 안되어있기 때문에 null

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    // 매번 새로 렌더링하지 않고, append 하도록 구현
    // 따라서 isInitialize라는 상태관리 변수 통해서 ul, button은 한 번만 렌더링
    if (!isInitialize) {
      $photoList.innerHTML = `<ul class="PhotoList__photos"></ul>`;
      isInitialize = true;
    }

    const { photos } = this.state;
    const $photos = $photoList.querySelector(".PhotoList__photos");

    photos.forEach((photo) => {
      // photo의 id 기준으로 렌더링 되어있는지 체크
      // 없으면 li 생성하고 $photos에 appendChild
      if ($photos.querySelector(`li[data-id='${photo.id}']`) === null) {
        const $li = document.createElement("li");

        $li.setAttribute("data-id", photo.id);
        // min-height: 처음에 이미지 렌더링되기 전에 li가 붙어서 내려오기 때문에, 마지막 li 위치에서 스크롤이 끝났다고 생각되는 오류 발생할 수 있는 것 방지
        // 따라서 처음부터 렌더링 할 때 스크롤 생기면서 나오기 때문에 안전!
        $li.style = "list-style: none;min-height: 800px";
        $li.innerHTML = `<img width="100%" src="${photo.imagePath}" />`;

        $photos.appendChild($li);
      }
    });

    // 마지막 li
    const $nextLi = $photos.querySelector("li:last-child");
    if ($nextLi !== null) {
      // 방어코드
      if ($lastLi !== null) {
        observer.unobserve($lastLi);
      }
      $lastLi = $nextLi;
      observer.observe($lastLi);
    }
  };

  this.render();

  window.addEventListener("scroll", () => {
    const { isLoading, totalCount, photos } = this.state;

    // 완전히 끝에 닿는 것보다는 100 정도 보정하여 대입합니다
    const isScrollEnded =
      window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight;

    // 로딩 중이지 않을 때만 호출 (데이터를 호출하고 그 다음에 호출) (isLoding을 이용하여 데이터가 한 번에 모두 로딩되는 것 방지)
    // totalCount 보다 현재 사진이 적을 때만 호출 (스크롤 끝에서의 무한 호출 방지)
    if (isScrollEnded && !isLoading && photos.length < totalCount) {
      onScrollEnded();
    }
  });
}
