import Product from "../models/product.model.js";

const search = async (req, res) => {
  const { searchValue } = req.params;
  const regex = new RegExp(searchValue, "i");
  try {
    const products = await Product.find({ title: { $regex: regex } });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export default { search };
