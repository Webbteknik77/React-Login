const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/SignUpModels");
const bcrypt = require("bcrypt");

router.post("/signup", async (request, response) => {
  console.log("Signup: " + request.body);
  console.log("Signup: " + request.body.registered);
  console.log("Signup: " + request.body.fullName);
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(request.body.password, saltPassword);

  const signedUpUser = new signUpTemplateCopy({
    fullName: request.body.fullName,
    username: request.body.username,
    email: request.body.email,
    password: securePassword,
  });
  signedUpUser
    .save()
    .then((data) => {
      console.log("..");
      response.json(data);
    })
    .catch((error) => {
      console.log("error: " + error);
      response.json(error);
    });
});

module.exports = router;
