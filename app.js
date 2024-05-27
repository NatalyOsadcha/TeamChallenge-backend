import express from "express";
import morgan from "morgan";
import cors from "cors";
// import cookieParser from "cookie-parser";
import "dotenv/config";

import productsRouter from "./routes/productsRouter.js";
import catalogsRouter from "./routes/catalogsRouter.js";
import usersRouter from "./routes/usersRouter.js";
import ordersRouter from "./routes/ordersRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/catalog", catalogsRouter);
app.use("/api/orders", ordersRouter);


app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
