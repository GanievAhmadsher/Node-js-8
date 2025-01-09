import express, { json } from "express";
import path from "node:path";
import fs from "node:fs";
import fsP from "node:fs/promises";

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await fsP.readFile(
    path.join(process.cwd(), "src", "jsons", "users.json")
  );
  res.json(JSON.parse(users));
});

app.get("/users/:id", async (req, res) => {
  const users = await fsP.readFile(
    path.join(process.cwd(), "src", "jsons", "users.json")
  );
  if (req.params.id) {
    const result = JSON.parse(users).filter((item) => item.id == req.params.id);
    if (result.length !== 0) {
      res.json(result);
    } else {
      res.send(`There isn't user item!`);
    }
  }
});

app.post("/user", async (req, res) => {
  let path_usersJ = path.join(process.cwd(), "src", "jsons", "users.json");
  let users = await fsP.readFile(path_usersJ);
  users = await JSON.parse(users);
  const body = req.body;
  body.id = users.length + 1;
  let write_users = JSON.stringify([...users, body], null, 2);
  await fsP.writeFile(path_usersJ, write_users);
});

app.get("*", async (req, res) => {
  res.send(`404 page not found`);
});
app.post("*", async (req, res) => {
  res.send(`404 page not found`);
});
app.put("*", async (req, res) => {
  res.send(`404 page not found`);
});
app.delete("*", async (req, res) => {
  res.send(`404 page not found`);
});

const port = 4000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running - : - http://localhost:${port}`);
});
