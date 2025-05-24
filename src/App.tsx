import { useCallback, useState } from "react";
import "./App.css";
import { TodoItem } from "./components/TodoItem";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const todo = (form.get("todo") || "") as string;
    setTodoList((prev) => {
      return [
        ...prev,
        {
          id: window.crypto.randomUUID(),
          title: todo,
          completed: false,
        },
      ];
    });
  };

  const onDelete = useCallback((todoId: string) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== todoId));
  }, []);

  const onToggleCompleted = useCallback((todoId: string) => {
    setTodoList((prev) =>
      prev.map((t) => (t.id === todoId ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="todo" placeholder="Add a new todo" />
        <button>Add</button>
      </form>

      <ul>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggleCompleted={onToggleCompleted}
          />
        ))}
      </ul>
    </>
  );
}

export default App;
