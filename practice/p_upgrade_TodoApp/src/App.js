import { request } from "./api.js";
import UserList from "./UserList.js";
import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";

export default function App({ $target }) {
  const $userListContainer = document.createElement("div");
  const $todoListContainer = document.createElement("div");

  $target.appendChild($userListContainer);
  $target.appendChild($todoListContainer);

  this.state = {
    userList: [],
    selectedUsername: null,
    todos: [],
    isTodoLoading: false,
  };

  const userList = new UserList({
    $target: $userListContainer,
    initialState: this.state.userList,
    onSelect: async (username) => {
      history.pushState(null, null, `/${username}`);
      this.setState({
        ...this.state,
        selectedUsername: username,
      });
      await await fetchTodos();
    },
  });

  const header = new Header({
    $target: $todoListContainer,
    initialState: {
      isLoading: this.state.isTodoLoading,
      selectedUsername: this.state.selectedUsername,
    },
  });

  new TodoForm({
    $target: $todoListContainer,
    onSubmit: async (content) => {
      const isFirstTodoAdd = this.state.todos.length === 0;
      // 낙관적 업데이트 (api가 잘 동작할거라고 믿고 client에 먼저 추가하고, server에 통신 ex.페이스북)
      const todo = {
        content,
        isCompleted: false,
      };
      this.setState({
        ...this.setState({
          todos: [...this.state.todos, todo],
        }),
      });

      await request(`/${this.state.selectedUsername}?delay=1000`, {
        method: "POST",
        body: JSON.stringify(todo), // FormData 방식도 있음!
      });
      await init();

      // 할 일이 없을 때도 userList에 추가되도록
      if (isFirstTodoAdd) {
        await fetchUserList();
      }
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    header.setState({
      isLoading: this.state.isTodoLoading,
      selectedUsername: this.state.selectedUsername,
    });

    todoList.setState({
      isLoading: this.state.isTodoLoading,
      todos: this.state.todos,
      selectedUsername: this.state.selectedUsername,
    });

    userList.setState(this.state.userList);
    this.render();
  };

  this.render = () => {
    const { selectedUsername } = this.state;
    $todoListContainer.style.display = selectedUsername ? "block" : "none";
  };

  const todoList = new TodoList({
    $target: $todoListContainer,
    initialState: {
      isTodoLoading: this.state.isTodoLoading,
      todos: this.state.todos,
      selectedUsername: this.state.selectedUsername,
    },
    onToggle: async (id) => {
      // 낙관적 업데이트
      const todoIndex = this.state.todos.findIndex((todo) => todo._id === id);

      const nextTodos = [...this.state.todos];
      nextTodos[todoIndex].isCompleted = !nextTodos[todoIndex].isCompleted;
      this.setState({
        ...this.state,
        todos: nextTodos,
      });
      await request(`/${this.state.selectedUsername}/${id}/toggle?dealy=1000`, {
        method: "PUT",
      });

      await fetchTodos();
    },
    onRemove: async (id) => {
      // 낙관적 업데이트
      const todoIndex = this.state.todos.findIndex((todo) => todo._id === id);
      const nextTodos = [...this.state.todos];
      nextTodos.splice(todoIndex, 1);
      this.setState({
        ...this.state,
        todos: nextTodos,
      });
      await request(`/${this.state.selectedUsername}/${id}?delay=1000`, {
        method: "DELETE",
      });
      await fetchTodos();
    },
  });

  const fetchUserList = async () => {
    const userList = await request("/users");
    this.setState({
      ...this.state,
      userList,
    });
  };

  const fetchTodos = async () => {
    const { selectedUsername } = this.state;

    if (selectedUsername) {
      this.setState({
        ...this.state,
        isTodoLoading: true,
      });
      const todos = await request(`/${selectedUsername}?delay=1000`);
      this.setState({
        ...this.state,
        todos,
        isTodoLoading: false,
      });
    }
  };

  const init = async () => {
    await fetchUserList();
    console.log(location.pathname);
    // url에 특정 사용자를 나타내는 값이 있는 경우
    // const { pathname } = location;
    // if (pathname.length > 1) {
    //   this.setState({
    //     ...this.state,
    //     selectedUsername: pathname.substring(1),
    //   });
    //   await fetchTodos();
    // }
  };

  this.render();
  init();
}
