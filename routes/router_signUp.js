const express = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/model_user");

const router = express.Router();
const saltRounds = 10;

router.post("/", async (req, res) => {
  console.log(req.body.name);
  const SignupUser = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: { city: req.body.address },
    password: req.body.password,
  });

  try {
    const checkResult = await User.findOne({ email: User.email });
    if (checkResult) {
      res.send("Email already exists, Try logging in.");
    } else {
      const hash = await bcrypt.hash(SignupUser.password, saltRounds);
      console.log("Hashed Password:", hash);
      SignupUser.password = hash;

      const createdUser = await SignupUser.save();
      res.status(201).json(createdUser);
    }
  } catch (err) {
    console.error("Error Reg User:", err);
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

module.exports = router;
