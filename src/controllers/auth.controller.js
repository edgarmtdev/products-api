import User from "../models/User";
import jwt from "jsonwebtoken";
import { secret } from "../config";

export default class AuthController {
  async logIn(req, res) {
    res.json("Hola");
  }

  async signUp(req, res) {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 864000, // 24 hours
    });
    return res.status(200).json({ token, user });
  }

  async validate(data) {
    const userFound = await User.find({ email });
  }
}
