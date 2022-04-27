import Product from "../models/Product";

export default class ProductsController {
  async createProduct(req, res) {
    const { name, price, category, imgURL } = req.body;
    const newProduct = new Product({
      name,
      category,
      price,
      imgURL,
    });
    const result = await newProduct.save();
    return res.status(201).json(result);
  }

  async getProducts(req, res) {
    const result = await Product.find();
    return res.status(200).json(result);
  }

  async getProductById(req, res) {
    const { id } = req.params;
    const result = await Product.findById(id);
    return res.status(200).json(result);
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const result = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(result);
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    const result = await Product.findByIdAndDelete(id);
    return res.status(204).json(result);
  }
}
