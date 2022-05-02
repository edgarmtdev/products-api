import jsonwebtoken from "jsonwebtoken";
import { secret } from "../config";
import User from "../models/User";

export const verifyToken = async (req, res, next) => {
     const token = req.headers['x-access-token']

     if (!token) return res.status(404).json({ message: "No token provider" })

     try {
          const decoded = jsonwebtoken.verify(token, secret)
          const user = await User.findOne({ _id: decoded.id })
          if (!user) return res.status(401).json({ message: 'User not found' })
          next()
     } catch (error) {
          return res.status(401).json({ message: "Unauthorized!" });
     }
}