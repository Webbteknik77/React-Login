const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/login", async (req, res) => {
  console.log(`wants to login`);

  const credentials = req.body;
  console.log(`credentials2: ${credentials.username}`);

  // valid usercredentials: j.sagrera77@gmail.com/Barcelona77
  if (credentials.username === "1" && credentials.password === "1") {
    console.log(`ok`);
    res.statusCode = 200;
    let token = jwt.sign({ data: credentials }, "shhhhh", { expiresIn: "1h" });

    res.send(token);
  } else {
    console.log(`not ok`);
    res.statusCode = 401;
  }
  res.end();
});

app.get("/test", (req, res) => {
  const token = "bl8b";
  console.log(`token: ${token}`);
  res.end();
});

app.get("/verifytoken", (req, res) => {
  console.log(`verifying...`);

  const token = req.query.token;
  console.log(`token: ${token}`);

  if (!token) {
    console.log(`token not ok`);
    res.statusCode = 401;
    res.end();
  } else {
    console.log(`token ok`);
    res.statusCode = 200;
    res.send(token);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
