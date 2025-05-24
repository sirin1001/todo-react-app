import { useState } from "react";
import "./App.css";

type Todo = {
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

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="todo" placeholder="Add a new todo" />
        <button>Add</button>
      </form>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                setTodoList((prev) =>
                  prev.map((t) =>
                    t.id === todo.id ? { ...t, completed: !t.completed } : t
                  )
                );
              }}
            />
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
