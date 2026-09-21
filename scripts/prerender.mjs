import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const require = createRequire(import.meta.url);
const babel = require("@babel/core");
const React = require("react");
const { renderToString } = require("react-dom/server");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.join(root, "build");
const indexPath = path.join(buildDir, "index.html");
const marker = '<div id="root"></div>';

require.extensions[".css"] = (module) => {
  module.exports = {};
};

for (const ext of [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]) {
  require.extensions[ext] = (module, filename) => {
    module.exports = `/static/media/${path.basename(filename)}`;
  };
}

const originalJsLoader = require.extensions[".js"];
require.extensions[".js"] = (module, filename) => {
  if (filename.includes("node_modules")) {
    return originalJsLoader(module, filename);
  }

  const source = fs.readFileSync(filename, "utf8");
  const { code } = babel.transformSync(source, {
    filename,
    presets: [require.resolve("babel-preset-react-app")],
    babelrc: false,
    configFile: false,
    compact: false,
  });
  return module._compile(code, filename);
};

const App = require(path.join(root, "src", "App.js")).default;
const appHtml = renderToString(React.createElement(App));
const html = fs.readFileSync(indexPath, "utf8");

if (!html.includes(marker)) {
  throw new Error(`Prerender marker not found in ${indexPath}`);
}

fs.writeFileSync(indexPath, html.replace(marker, `<div id="root">${appHtml}</div>`));
console.log("Prerendered React app into build/index.html");
