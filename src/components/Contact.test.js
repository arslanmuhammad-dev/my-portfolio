import React, { act } from "react";
import { createRoot } from "react-dom/client";
import emailjs from "@emailjs/browser";
import Contact from "./Contact";

jest.mock("@emailjs/browser", () => ({ sendForm: jest.fn() }));

let container;
let root;
const originalEnv = { ...process.env };

beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  window.matchMedia = () => ({ matches: true });
  process.env.REACT_APP_EMAILJS_SERVICE_ID = "test-service";
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID = "test-template";
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY = "test-key";
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  // This is the native React root API, not a Testing Library render helper.
  // eslint-disable-next-line testing-library/no-unnecessary-act, testing-library/no-render-in-setup
  act(() => root.render(<Contact />));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.clearAllMocks();
  process.env = { ...originalEnv };
});

async function submit() {
  await act(async () => {
    container
      .querySelector("form")
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
}

test("preserves EmailJS template fields and resets only after success", async () => {
  const form = container.querySelector("form");
  expect(
    Array.from(form.querySelectorAll("[name]")).map((el) => el.name),
  ).toEqual(["name", "email", "subject", "message"]);
  form.elements.name.value = "Test Person";
  emailjs.sendForm.mockResolvedValue({ status: 200 });
  await submit();
  expect(emailjs.sendForm).toHaveBeenCalledWith(
    "test-service",
    "test-template",
    form,
    { publicKey: "test-key" },
  );
  expect(form.elements.name.value).toBe("");
  expect(container.querySelector('[role="status"]').textContent).toContain(
    "Message sent",
  );
});

test("retains the message and restores the submit button when delivery fails", async () => {
  container.querySelector('[name="message"]').value = "Keep my message";
  emailjs.sendForm.mockRejectedValue(new Error("Network unavailable"));
  await submit();
  expect(container.querySelector('[name="message"]').value).toBe(
    "Keep my message",
  );
  expect(container.querySelector('[role="alert"]').textContent).toContain(
    "could not be sent",
  );
  expect(container.querySelector('button[type="submit"]').disabled).toBe(false);
});

test("shows a direct email fallback without requesting an unconfigured service", async () => {
  delete process.env.REACT_APP_EMAILJS_SERVICE_ID;
  await submit();
  expect(emailjs.sendForm).not.toHaveBeenCalled();
  expect(container.querySelector('[role="alert"]').textContent).toContain(
    "arslansaleem622@gmail.com",
  );
});
