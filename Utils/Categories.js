const Category = require('../models/Categories');

const createCategory = async (category_id, category_name, per) => {
  const newCategory = new Category({
    CategoryId: category_id,
    CategoryName: category_name,
    Per: per
  });

  try {
    const savedCategory = await newCategory.save();
    return savedCategory;
  }
  catch (error) {
    console.error(error);
    throw new Error('Failed to create category');
  }
};

const getCategories = async () => {
    return await Category.find({});
};

const getCategoryById = async (category_id) => {
  return await Category.findOne({ 'CategoryId': category_id });
};

const deleteCategories = async (category_id) => {
      const deletedcategory = await Order.findByIdAndRemove(category_id);
      return deletedcategory;
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    deleteCategories
}