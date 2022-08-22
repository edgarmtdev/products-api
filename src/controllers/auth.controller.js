import User from "../models/User";
import jwt from "jsonwebtoken";
import { secret } from "../config";
import Role from "../models/Role";

export default class AuthController {
    async logIn(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate("roles");
        const validatePassword = await User.comparePassword(
            password,
            user.password
        );

        const roleUser = await Role.findOne({
            name: "admin",
        }).populate("roles");
        console.log(roleUser);

        if (!user)
            return res.status(400).json({
                message: "User not found",
            });

        if (!validatePassword)
            return res.status(400).json({ message: "The password is incorrect" });

        const token = jwt.sign({ id: user._id }, secret, {
            expiresIn: 864000, // 24 hours
        });

        return res.status(200).json({ token: token });
    }

    async signUp(req, res) {
        const { username, email, password, roles } = req.body;
        const userFound = await User.find({ email });

        if (userFound.length <= 0) {
            const newUser = new User({
                username,
                email,
                password: await User.encryptPassword(password),
            });

            if (roles) {
                const foundRoles = await Role.find({ name: { $in: roles } });
                newUser.roles = foundRoles.map((role) => role._id);
            } else {
                const role = await Role.findOne({ name: "user" });
                newUser.roles = [role._id];
            }

            const user = await newUser.save();
            const token = jwt.sign({ id: user._id }, secret, {
                expiresIn: 864000, // 24 hours
            });
            return res.status(200).json({ token, user });
        } else {
            return res.json({ error: `Ya existe una cuenta con el email: ${email}` });
        }
    }
}
