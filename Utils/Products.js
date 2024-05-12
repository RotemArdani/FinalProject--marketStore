const Product = require('../models/Products');

const createProduct = async (category_id, product_name, product_id, price, quantity, image) => {
    const newProduct = new Products({
        CategoryId: category_id,
        ProductName: product_name,
        ProductId: product_id,
        Price: price,
        Quantity: quantity,
        Image: image
    });

    return await newProduct.save();
};

const getProductById = async (product_id) => {
    try {
      const product = await Product.findOne({ 'ProductId': product_id });
      return product;
    }
    catch (error) {
      console.error('Error fetching product: ', error);
      throw error;
    }
  };

const getProductsByCategoryId = async (category_id) => {
    try {
        const products = await Product.find({ 'CategoryId': category_id });
        return products;
    }
    catch (error) {
        console.error('Error fetching products by category id: ', error);
        throw error;
    }
};

const getProducts = async () => {
    try {
      const products = await Product.find();
      return products;
    }
    catch (error) {
      console.error('Error fetching products: ', error);
      throw error;
    }
  };

const updateName = async (product_id, product_name) => {
const product = await getProductById(product_id);
if (!product)
    return null;

product.ProductName = product_name;
await product.save();
return product;
};

const updatePrice = async (product_id, price) => {
    const product = await getProductById(product_id);
    if (!product)
        return null;

    product.Price = price;
    await product.save();
    return product;
};

const updateQuantity= async (product_id, quantity) => {
    const product = await getProductById(product_id);
    if (!product)
        return null;

    product.Quantity = quantity;
    await product.save();
    return product;
};

const updateImage = async (product_id, image) => {
    const product = await getProductById(product_id);
    if (!product)
        return null;

    product.Image = image;
    await product.save();
    return product;
};

const deleteProduct = async (product_id) => {
    const productToDelete = await getProductById(product_id);
    if (!productToDelete)
      return null;
  
    const deletedProduct = await Products.findByIdAndRemove(productToDelete.ProductId);
    return deletedProduct;
  };
  
module.exports = {
    createProduct,
    getProductById,
    getProductsByCategoryId,
    getProducts,
    updateName,
    updatePrice,
    updateQuantity,
    updateImage,
    deleteProduct
}