import React, { act } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Header";

let container;
let root;

beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close() {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

test("keeps mobile menu state in sync after the dialog closes", () => {
  act(() => root.render(<Header />));
  const toggle = container.querySelector("#mobile-menu-toggle");
  const dialog = container.querySelector("#navigation-dialog");

  act(() => toggle.click());
  expect(dialog.open).toBe(true);
  expect(toggle.getAttribute("aria-expanded")).toBe("true");

  act(() => dialog.close());
  expect(toggle.getAttribute("aria-expanded")).toBe("false");

  act(() => toggle.click());
  expect(dialog.open).toBe(true);
});
