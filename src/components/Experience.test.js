import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Experience from "./Experience";

test("shows both work histories while keeping education collapsed", () => {
  const document = new DOMParser().parseFromString(
    renderToStaticMarkup(<Experience />),
    "text/html",
  );
  const devflovv = document.querySelector("#exp-devflovv");
  const argonteq = document.querySelector("#exp-argonteq");
  const education = document.querySelector("#edu-uol");

  expect(devflovv.open).toBe(true);
  expect(argonteq.open).toBe(true);
  expect(argonteq.querySelectorAll(".experience-details li")).toHaveLength(5);
  expect(argonteq.textContent).toContain("React.js Developer");
  expect(education.open).toBe(false);
});
