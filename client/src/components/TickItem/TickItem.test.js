import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { TickItem } from "./TickItem";

test("test update props", async () => {
  const { rerender } = render(
    <Provider store={store}>
      <TickItem ticker={"Google"} />
    </Provider>
  );

  expect(screen.getByTestId("ticker")).toHaveTextContent("Google");

  rerender(
    <Provider store={store}>
      <TickItem ticker={"Tesla"} />
    </Provider>
  );

  expect(screen.getByTestId("ticker")).toHaveTextContent("Tesla");
});

test("test control button", async () => {
  const { rerender } = render(
    <Provider store={store}>
      <TickItem isPassiveTicker={true} />
    </Provider>
  );

  expect(screen.getByRole("button")).toHaveTextContent("Off");

  rerender(
    <Provider store={store}>
      <TickItem isPassiveTicker={false} />
    </Provider>
  );

  expect(screen.getByRole("button")).toHaveTextContent("On");
});
