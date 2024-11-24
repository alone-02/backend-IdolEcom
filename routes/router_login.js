const express = require("express");
const bcrypt = require("bcryptjs");
const signupUser = require("../models/model_user");
const jwt = require("jsonwebtoken");
const env = require("dotenv");

const router = express.Router();
env.config();
const secret = process.env.secret;

// get particular User
router.get("/userlist/:id", async (req, res) => {
  const id = req.params.id;
  const user = await signupUser.findById(id).select("-password");

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  res.status(200).send(user);
});

//get User List
router.get("/userlist", async (req, res) => {
  const user = await signupUser.find().select("-password");

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  res.status(200).send(user);
});

//login details
router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await signupUser.findOne({ email: email });
    //console.log(user.password);
    if (!user) {
      return res.status(400).json({ messsage: "User Not Found !" });
    }

    const result = await bcrypt.compare(password, user.password);
    //console.log(user.isadmin);
    if (user && result) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isadmin,
        },
        secret,
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).send({ user: user.email, token: token, admin: user.isadmin });
    } else {
      return res.status(400).json({ messsage: "Password is incorrect !" });
    }
  } catch (error) {
    return res.status(401).json({ messsage: "internal server error !" });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const response = await signupUser.findByIdAndDelete(id);
    console.log(response);
    if (!response) {
      res.status(400).json({ Success: false, message: "User is not Deleted..!" });
    }
    res.status(200).json({ Success: true, message: "User is Deleted..!" });
  } catch (err) {
    res.status(400).json({ Success: false, message: "Internal Server Error" });
  }
});

module.exports = router;