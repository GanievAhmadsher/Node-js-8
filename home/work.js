// * Homework - Lesson 8

import express from "express";
import path from "node:path";
import fs from "node:fs";
import fsP from "node:fs/promises";

const work = express();
work.use(express.json());

work.get("/api/products/search", async (req, res) => {
  const query = req.query.q.toLowerCase();
  const _path_ = path.join(process.cwd(), "home", "api", "products.json");
  const products = await JSON.parse(await fsP.readFile(_path_));
  const result = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  );

  if (result.length === 0) {
    return res
      .status(404)
      .json({ message: "Qidiruv bo'yicha mahsulotlar topilmadi" });
  }
  res.status(200).json(result);
});

work.get("/api/products", async (req, res) => {
  const _path_ = path.join(process.cwd(), "home", "api", "products.json");
  const products = await JSON.parse(await fsP.readFile(_path_));
  res.json(products);
});

work.get("/api/products/:id", async (req, res) => {
  const _path_ = path.join(process.cwd(), "home", "api", "products.json");
  const products = await JSON.parse(await fsP.readFile(_path_));
  const product = products.find((item) => item.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Mahsulot topilmadi" });
  }

  res.json(product);
});

work.get("/api/products/category/:name", async (req, res) => {
  const _path_ = path.join(process.cwd(), "home", "api", "products.json");
  const products = await JSON.parse(await fsP.readFile(_path_));
  const filteredProducts = products.filter(
    (item) => item.category === req.params.name.toLowerCase()
  );
  console.log(filteredProducts);

  if (filteredProducts.length === 0) {
    return res
      .status(404)
      .json({ message: "Ushbu kategoriyada mahsulotlar topilmadi" });
  }

  res.json(filteredProducts);
});

// ! page not found

work.post("*", async (req, res) => {
  const htmlPath = path.join(process.cwd(), "home", "error", "error.html");
  const cssPath = path.join(process.cwd(), "home", "error", "main.css");
  const [html_D, css_D] = await Promise.all([
    fsP.readFile(htmlPath, "utf-8"),
    fsP.readFile(cssPath, "utf-8"),
  ]);
  const error_page = html_D.replace(
    "</head>",
    `<style>${css_D}</style></head>`
  );
  res.writeHead(404, { "content-type": "text/html" });
  res.end(error_page);
});

work.get("*", async (req, res) => {
  const htmlPath = path.join(process.cwd(), "home", "error", "error.html");
  const cssPath = path.join(process.cwd(), "home", "error", "main.css");
  const [html_D, css_D] = await Promise.all([
    fsP.readFile(htmlPath, "utf-8"),
    fsP.readFile(cssPath, "utf-8"),
  ]);
  const error_page = html_D.replace(
    "</head>",
    `<style>${css_D}</style></head>`
  );
  res.writeHead(404, { "content-type": "text/html" });
  res.end(error_page);
});

work.delete("*", async (req, res) => {
  const htmlPath = path.join(process.cwd(), "home", "error", "error.html");
  const cssPath = path.join(process.cwd(), "home", "error", "main.css");
  const [html_D, css_D] = await Promise.all([
    fsP.readFile(htmlPath, "utf-8"),
    fsP.readFile(cssPath, "utf-8"),
  ]);
  const error_page = html_D.replace(
    "</head>",
    `<style>${css_D}</style></head>`
  );
  res.writeHead(404, { "content-type": "text/html" });
  res.end(error_page);
});

work.put("*", async (req, res) => {
  const htmlPath = path.join(process.cwd(), "home", "error", "error.html");
  const cssPath = path.join(process.cwd(), "home", "error", "main.css");
  const [html_D, css_D] = await Promise.all([
    fsP.readFile(htmlPath, "utf-8"),
    fsP.readFile(cssPath, "utf-8"),
  ]);
  const error_page = html_D.replace(
    "</head>",
    `<style>${css_D}</style></head>`
  );
  res.writeHead(404, { "content-type": "text/html" });
  res.end(error_page);
});

// ! page not found

const _port_ = 4001;
work.listen(_port_, "0.0.0.0", () => {
  console.log(`Server running | http://localhost:${_port_}`);
});
