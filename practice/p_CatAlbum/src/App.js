// App.js : onClick 이벤트를 통해, 실제 노드를 클릭했을 때 어떤 일이 일어나는 지에 대한 디테일한 작업

import { request } from "./api.js";
import Breadcrumb from "./Breadcrumb.js";
import ImageViewer from "./ImageViewer.js";
import Loading from "./Loading.js";
import Nodes from "./Nodes.js";

export default function App({ $target }) {
  this.state = {
    isRoot: true,
    isLoading: false,
    nodes: [],
    paths: [], // 노드 클릭할 때마다 paths에 경로를 쌓아주어서, 이전 페이지로 갈 수 있도록
  };

  const loading = new Loading({
    $target,
  });

  const breadcrumb = new Breadcrumb({
    $target,
    initialState: this.state.paths,
    onClick: async (id) => {
      // 클릭한 경로 외의 paths 없애기
      if (id) {
        const nextPaths = id ? [...this.state.paths] : [];
        const pathIndex = nextPaths.findIndex((path) => path.id === id);
        this.setState({
          ...this.state,
          paths: nextPaths.slice(0, pathIndex + 1),
        });
      } else {
        this.setState({
          ...this.state,
          paths: [],
        });
      }

      // 나머지 컴포넌트에서 알아서 동작 (데이터 불러오고, 렌더링하고)
      await fetchNodes(id);
    },
  });

  const nodes = new Nodes({
    $target,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
      selectedImageUrl: null,
    },
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        await fetchNodes(node.id);

        this.setState({
          ...this.state,
          paths: [...this.state.paths, node],
        }); // paths.push(node);
      }

      if (node.type === "FILE") {
        this.setState({
          ...this.state,
          selectedImageUrl: `https://kdt-frontend.cat-api.programmers.co.kr/static${node.filePath}`,
        });
      }
    },
    onPrevClick: async () => {
      const nextPaths = [...this.state.paths];
      nextPaths.pop();
      this.setState({
        ...this.state,
        paths: nextPaths,
      });

      // 길이 0이면 루트로 보내준다.
      if (nextPaths.length === 0) {
        await fetchNodes();
        // 아니면 그 전으로
      } else {
        await fetchNodes(nextPaths[nextPaths.length - 1].id);
      }
    },
  });

  const imageViewer = new ImageViewer({
    $target,
    onClose: () => {
      this.setState({
        ...this.state,
        selectedImageUrl: null, // null 되면 닫는 처리가 된다!
      });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });

    imageViewer.setState({
      selectedImageUrl: this.state.selectedImageUrl,
    });

    // state 바뀔 때마다 현재 isLoading 대입, Loading.js에서 이 값에 따라 로딩 중 표시 여부 판단하여 처리
    loading.setState(this.state.isLoading);

    breadcrumb.setState(this.state.paths);
  };

  const fetchNodes = async (id) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    // id 있으면 해당 데이터 불러오고, 없으면 루트 기준으로 불러오기
    const nodes = await request(id ? `/${id}` : "/");

    this.setState({
      ...this.state,
      nodes,
      isRoot: id ? false : true,
      isLoading: false, // fetchNodes 종료되면 false로 변경
    });
  };

  fetchNodes();
}
