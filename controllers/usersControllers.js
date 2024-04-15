import * as userServices from "../services/usersServices.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { registerUserSchema } from "../schemas/usersSchemas.js";
import { nanoid } from "nanoid";


export const registerUser = ctrlWrapper(async (req, res) => {
    const { error } = registerUserSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    const { name, email, phone, password } = req.body;


    const existingUser = await userServices.findUser({ email });
    if (existingUser) {
        throw HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();

    const newUser = await userServices.signup({
        name,
        email,
        phone,
        password: hashedPassword,
        verificationToken,
    });

    res.status(201).json({
        user: {
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
        }
    });
});