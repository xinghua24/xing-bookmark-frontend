import React, { ReactElement } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { MemoryRouter, Router } from "react-router-dom";

function renderWithProviders(ui: any) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>
    </Provider>
  );
}

test("renders welcome text", async () => {
  renderWithProviders(<App />);
  const signInButton = screen.getByText(/signin/i);
  await screen.findByText(/Welcome to Xing's Bookmark/i);
});
