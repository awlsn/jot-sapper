import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

/* function one(req, res, next) {
  req.hello = "world";
  next();
}

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware(),
    one
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
 */

const app = polka();

app.get("/", (req, res) => {
  res.end("Hello world!");
});

app.get("/users", (req, res) => {
  res.end("Get all users!");
});

app.post("/users", (req, res) => {
  res.end("Create a new User!");
});

app.put("/users/:id", (req, res) => {
  res.end(`Update User with ID of ${req.params.id}`);
});

app.delete("/users/:id", (req, res) => {
  res.end(`CY@ User ${req.params.id}!`);
});
