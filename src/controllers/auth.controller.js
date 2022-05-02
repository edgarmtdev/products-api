import User from "../models/User";
import jwt from "jsonwebtoken";
import { secret } from "../config";
import Role from "../models/Role";

export default class AuthController {

    async logIn(req, res) {
        res.json("Hola");
    }

    async signUp(req, res) {
        const { username, email, password, roles } = req.body;

        const userFound = await User.find({ email });
        console.log(userFound);
        if (userFound.length <= 0) {
            const newUser = new User({
                username,
                email,
                password: await User.encryptPassword(password),
            });

            if (roles) {
                const foundRoles = await Role.find({ name: { $in: roles } })
                newUser.roles = foundRoles.map(role => role._id)
            } else {
                const role = await Role.findOne({ name: 'user' })
                newUser.roles = [role._id]
            }

            const user = await newUser.save();
            const token = jwt.sign({ id: user._id }, secret, {
                expiresIn: 864000, // 24 hours
            });
            return res.status(200).json({ token, user });
        } else {
            return res.json({ error: `Ya existe una cuenta con el email: ${email}` })
        }
    }
}
