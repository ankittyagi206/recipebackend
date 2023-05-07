import express from "express";
import { UserModel } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (user) {
    res.json({ message: "User already registered!!" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    newUser.save();

    res.json({ message: "User created successfully!" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await UserModel.findOne({ username });
  console.log("user", user);
  //Check if username exists in our database
  if (!user) {
    return res.json({ message: "User doesn't exist!" });
  }
  //Check if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as userRouter };
