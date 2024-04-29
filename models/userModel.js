import mongoose from "mongoose";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new mongoose.Schema({
  password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        unique: true,
    },
    email: {
        type: String,
        match: [emailRegexp, 'Invalid email format'],
        required: [true, 'Email is required'],
        unique: true,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    }
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

export default User;