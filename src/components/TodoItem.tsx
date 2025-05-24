import { memo } from "react";
import type { Todo } from "../App";

type Props = {
  todo: Todo;
  onToggleCompleted: (todoId: string) => void;
  onDelete: (todoId: string) => void;
};

export const TodoItem = memo(({ todo, onToggleCompleted, onDelete }: Props) => {
  return (
    <li key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {
          onToggleCompleted(todo.id);
        }}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.title}
        <button
          onClick={() => {
            onDelete(todo.id);
          }}
        >
          Delete
        </button>
      </span>
    </li>
  );
});
