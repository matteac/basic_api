const path = require("node:path");
const express = require("express");
const bparser = require("body-parser");
const router = require(path.join(__dirname, "Routes", "routes.js"));
const app = express();

const port = process.env.PORT || 2121;

require(path.join(__dirname, "db.js"));

app.use(bparser.json([]));

app.use(router);

app.listen(port, (_) => {
    console.log(`Running on http://127.0.0.1:${port}`);
});
