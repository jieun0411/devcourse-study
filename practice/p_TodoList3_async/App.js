import TodoList from "./TodoList.js";
import TodoComments from "./TodoComments.js";
import { request } from "./api.js";

export default function App({ $app }) {
  this.state = {
    todos: [],
    selectedTodo: null,
    comments: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(this.state.todos);
    todoComments.setState({
      selectedTodo: this.state.selectedTodo,
      comments: this.state.comments,
    });
  };

  const todoList = new TodoList({
    $target: $app,
    initialState: this.state.todos,
    onClick: async (id) => {
      const selectedTodo = this.state.todos.find((todo) => todo.id === id);
      this.setState({
        ...this.state,
        selectedTodo,
      });
      // 댓글 목록 불러오기
      try {
        // 로딩 중 보여주기 처리
        const data = await request(
          `https://kdt.roto.codes/comments?todo.id=${id}`
        );
        this.setState({
          ...this.state,
          comments: data,
        });
      } catch (e) {
        // promise의 .catch와 비슷한 역할
      } finally {
        // promise의 .finally와 비슷한 역할
        // 로딩 중 숨겨주는 처리
      }
    },
  });

  const todoComments = new TodoComments({
    $target: $app,
    initialState: {
      selectedTodo: this.state.selectedTodo,
      comments: this.state.comments,
    },
  });

  // API 로딩 (todos 불러오기)
  this.init = async () => {
    const data = await request("https://kdt.roto.codes/todos");
    this.setState({
      ...this.state,
      todos: data,
    });
  };
  this.init();
}
