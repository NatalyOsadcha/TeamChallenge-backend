import mongoose from "mongoose";
import app from "./app.js"

mongoose.Promise = global.Promise;

const { DB_HOST } = process.env;
const port = 3000;

mongoose.connect(DB_HOST)
    .then(() => {
        app.listen(port);
        console.log("Server started on port: ${port}");
        console.log("Database connection successful");
    })
    .catch(error => {
        console.log("Database connection error:", error.message);
        process.exit(1);
    });