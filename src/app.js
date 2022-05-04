import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import cors from 'cors'
// Routes imports
import productsRouter from "./routes/products.routes";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes"
import { createRole } from "./libs/initialSetup";

const app = express();
createRole()

app.set("pkg", pkg);

// Morgan instance
app.use(morgan("dev"));
// CORS

app.use(cors())

//Midlewares
app.use(express.json())


app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    version: app.get("pkg").version,
  });
});

// Use routes
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter)

export default app;
