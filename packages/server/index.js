const express = require("express");
const middleware = require("./middleware");
require("dotenv").config({ path: "./.env.development" });

const auth0Route = require("./routes/auth0");

const app = express();
middleware(app);

app.use(auth0Route);
const port = 3000;

app.get("/", (req, res) => {
  res.json({ status: "pong" });
});

app.listen(port);
