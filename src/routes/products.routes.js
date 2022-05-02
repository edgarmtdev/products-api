import { Router } from "express";
import ProductsController from "../controllers/products.controller";
const router = Router();
import { verifyToken } from '../middlewares'
const productsController = new ProductsController();

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);
router.post("/create", verifyToken, productsController.createProduct);
router.put("/update/:id", productsController.updateProduct);
router.delete("/delete/:id", productsController.deleteProduct);

export default router;