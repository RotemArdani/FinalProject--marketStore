const productsUtils = require('../Utils/Products');

const createProduct = async (req, res) => {
  const { CategoryId, ProductName, ProductId, Price, Quantity, Image } = req.body;

  if (!ProductId) {
    return res.status(400).json({ message: 'Product Id is required' });
  }
 const existing_product = await productsUtils.getProductById(ProductId);
 if (existing_product) {
   return res.status(400).json({ error: 'Product already exists' });
 }

  const IntPrice = parseInt(Price, 10);
  const IntQuantity = parseInt(Quantity, 10);

  const new_product = await productsUtils.createProduct(CategoryId, ProductName, ProductId, IntPrice, IntQuantity, Image);

  res.status(200).json({ message: 'Product created successfully!', Product: new_product });

};

const getProducts = async (req, res) => {
  const product = await productsUtils.getProducts();
  res.json(product);
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.ProductId;
    const product = await productsUtils.getProductById(productId);
    if (!product) {
      return res.status(404).json({ errors: ['Product not found'] });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
};

const updateProduct = async (req, res) => {
  const { CategoryId, ProductName, ProductId, Price, Quantity, Image } = req.body;
  if (!ProductId) {
    return res.status(400).json({ message: 'Product Id is required' });
  }

  try {
    let product;

    if (ProductName) {
        product = await productsUtils.updateName(ProductId, ProductName);
    }

    if (Price) {
      const IntPrice = parseInt(Price, 10);
      if (!isNaN(IntPrice)) {
        product = await productsUtils.updatePrice(ProductId, IntPrice);
      }
    }

    if (Quantity) {
      const IntQuantity = parseInt(Quantity, 10);
      if (!isNaN(IntQuantity)) {
        product = await productsUtils.updateQuantity(ProductId, IntQuantity);
      }
    }

    if (Image) {
      product = await productsUtils.updateImage(ProductId, Image);

    }

    if (!product) {
      return res.status(404).json({ errors: ['Product not found'] });
    }

    res.status(200).json({ message: 'Product updated successfully!'});

  } catch (error) {
    return res.status(500).json({ message: 'Error updating product' });
  }
};

const deleteProduct = async (req, res) => {
  const product = await productsUtils.deleteProduct(req.params.ProductId);
  if (!product) {
    return res.status(404).json({ errors: ['Product not found'] });
  }

  res.status(204).send();
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};