import { User } from "../models/user.model.js";

export const postUserSignUp = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.json("User added!");
    console.log(req.body);
  } catch (error) {
    console.log("Error: " + error);
  }
};
