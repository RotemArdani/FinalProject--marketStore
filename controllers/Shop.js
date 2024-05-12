const productsUtils = require('../Utils/Products');
const usersUtils = require('../Utils/Users');

const index = async (req, res) => {
  try {
    const products = await productsUtils.getProducts();
    const user_name = req.query.User_Name || '';
    //const search = req.query.search || '';

    let foundUser;
    if (user_name && user_name !== '') {
      foundUser = await usersUtils.getUserByUserName(user_name);
    } else {
      foundUser = {};
    }
    console.log('founduser:', foundUser.User_Name);

    res.render("../Views/Shop.ejs", { products, user_name, user: foundUser });

  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

module.exports = {
    index
};