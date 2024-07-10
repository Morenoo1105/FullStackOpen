import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Todo from "./Todo";

const newTodo = { text: "new todo", done: false };

const placeholder = () => {};

test("renders todo", () => {
  render(
    <Todo todo={newTodo} deleteTodo={placeholder} completeTodo={placeholder} />
  );

  const todo = screen.getByText("new todo");
  const doneButton = screen.getByText("Set as done");

  expect(todo).toBeDefined();
  expect(doneButton).toBeDefined();
});
