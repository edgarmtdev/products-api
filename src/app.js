import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

const app = express();

app.set("pkg", pkg);

// Morgan instance
app.use(morgan("dev"));

//Midlewares
app.use(express.json())

// Routes imports
import productsRouter from "./routes/products.routes";

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    version: app.get("pkg").version,
  });
});

// Use routes
app.use("/products", productsRouter);

export default app;
