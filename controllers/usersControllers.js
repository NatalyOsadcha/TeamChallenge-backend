import * as userServices from "../services/usersServices.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import User from "../models/userModel.js";
import sendEmail from "../helpers/sendEmail.js";
import { registerUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

const { SECRET_KEY, BASE_URL } = process.env;

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

    const verifyEmail = {
        to: email, subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
        }
    });
});

export const verifyEmail = ctrlWrapper(async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw HttpError(404, "Email not found");
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

    res.status(200).json({ message: "Email successfully verified" });
});

export const resendVerifyEmail = ctrlWrapper(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "missing required field email" });
    }
    
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email not found");
    }

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
        to: email, subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.status(200).json({ message: "Verification email sent" });
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

    if (!existingUser.verify) {
        throw HttpError(401, "Email not verified");
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
            role: existingUser.role,
        }
    });
});

export const getCurrentUser = ctrlWrapper(async (req, res) => {
    const { name, email, role } = req.user;

    res.json({
        name,
        email,
        role,
    });
});

export const logoutUser = ctrlWrapper(async(req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json({ message: "No Content" });
});
