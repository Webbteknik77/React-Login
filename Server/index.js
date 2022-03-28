const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("../SignUpBackend/routes/signup");
const cors = require("cors");
const User = require("../SignUpBackend/models/SignUpModels");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database connected")
);

app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);

const jwt = require("jsonwebtoken");

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/login", async (req, res) => {
  const credentials = req.body;

  let autenticated = false;

  const authenticate = () => {
    return new Promise((resolve, reject) => {
      User.findOne(
        { password: credentials.password },
        "password",
        (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        }
      );

      autenticated = true;
    });
  };

  let authenticated = await authenticate();
  console.log(`autenticated: ` + autenticated);

  if (authenticated) {
    console.log(`ok`);
    res.statusCode = 200;
    let token = jwt.sign({ data: credentials }, "shhhhh", { expiresIn: "1h" });

    res.send(token);
  } else {
    res.statusCode = 401;
  }
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

app.listen(3001, () => {
  console.log("Server is up and running");
});
