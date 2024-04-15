import * as userServices from "../services/usersServices.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import User from "../models/userModel.js";
import { registerUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";


const { SECRET_KEY } = process.env;

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

export const loginUser = ctrlWrapper(async (req, res) => {

    const { error } = loginUserSchema.validate(req.body);
    if (error) {
        res.status(401).json({ message: error.message });
        return;
    }
    
    const { email, password } = req.body;
    
    const existingUser = await userServices.findUser({ email });
    if (!existingUser) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, existingUser.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: existingUser._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(existingUser._id, { token });

    res.status(200).json({
        token,
        user: {
            email: existingUser.email,
        }
    });
});