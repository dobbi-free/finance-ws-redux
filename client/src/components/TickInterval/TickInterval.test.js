import React from "react";
import "@testing-library/jest-dom";
import { TickInterval } from "./TickInterval";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";

test("test input changes", async () => {
  render(
    <Provider store={store}>
      <TickInterval />
    </Provider>
  );
  const input = screen.getByDisplayValue(1);
  fireEvent.change(input, { target: { value: 6 } });
  expect(input.value).toBe("6");
});

test("test set interval button", async () => {
  render(
    <Provider store={store}>
      <TickInterval />
    </Provider>
  );
  const input = screen.getByDisplayValue(5);
  const button = screen.getByText("Set Interval");
  fireEvent.change(input, { target: { value: 6 } });
  userEvent.click(button);
  expect(screen.getByText("Current interval: 6 sec")).toBeInTheDocument();
});
