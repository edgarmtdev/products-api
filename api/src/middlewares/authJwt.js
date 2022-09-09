import jsonwebtoken from "jsonwebtoken";
import { secret } from "../config";
import Role from "../models/Role";
import User from "../models/User";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) return res.status(404).json({ message: "No token provider" });

  try {
    const decoded = jsonwebtoken.verify(token, secret);
    req.id = decoded.id;
    const user = await User.findOne({ _id: decoded.id });
    if (!user) return res.status(401).json({ message: "User not found" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (const role of roles) {
      if (role.name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: " NOT HAVE PERMISSIONS" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (const role of roles) {
      if (role.name === "moderator") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: " NOT HAVE PERMISSIONS" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
