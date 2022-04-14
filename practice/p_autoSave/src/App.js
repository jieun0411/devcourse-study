import PostsPage from "./PostsPage.js";
import PostEditPage from "./postEditpage.js";
import { initRouter } from "./router.js";

// url 규칙
// 루트 - postPage에 그리기
// /posts/{id} - id에 해당하는 post 생성
// /posts/new - 새 post 생성

export default function App({ $target }) {
  const postsPage = new PostsPage({
    $target,
  });
  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    $target.innerHTML = "";
    const { pathname } = window.location;

    if (pathname === "/") {
      postsPage.setState();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/"); // [ , posts, postId]
      postEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
