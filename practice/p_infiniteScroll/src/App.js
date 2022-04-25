import PhotoList from "./PhotoList.js";
import { request } from "./api.js";

export default function APP({ $target }) {
  const $h1 = document.createElement("h1");
  $h1.innerHTML = "Cat Photos";
  $h1.style.textAlign = "center";
  $target.appendChild($h1);

  this.state = {
    limit: 5,
    nextStart: 0, // limit 갯수만큼 계속 더해진다.
    photos: [],
    totalCount: 0,
    isLoading: false,
  };

  const photoListComponent = new PhotoList({
    $target,
    initialState: {
      isLoading: this.state.isLoading,
      photos: this.state.photos,
      totalCount: this.state.totalCount,
    },
    onScrollEnded: async () => {
      await fetchPhotos();
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    photoListComponent.setState({
      isLoading: this.state.isLoading,
      photos: nextState.photos,
      totalCount: this.state.totalCount,
    });
  };

  const fetchPhotos = async () => {
    this.setState({
      ...this.state,
      isLoading: true, // isLoading은 debounce와 비슷한 역할!
    });
    const { limit, nextStart } = this.state;

    const photos = await request(
      `/cat-photos?_limit=${limit}&_start=${nextStart}`
    );
    this.setState({
      ...this.state,
      nextStart: nextStart + limit, // fetchPhotos 호출될 때마다 nextStart 증가하면서, 다음 페이지를 불러준다.
      photos: [...this.state.photos, ...photos], // this.state.photos.concat(photos)
      isLoading: false,
    });
  };

  const initialize = async () => {
    const totalCount = await request("/cat-photos/count");

    this.setState({
      ...this.state,
      totalCount,
    });

    await fetchPhotos();
  };

  initialize();
}
