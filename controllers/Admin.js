const productsUtils = require('../Utils/Products');
const usersUtils = require('../Utils/Users');
const ordersUtils = require('../Utils/Orders');

const index = async (req, res) => {
  try {
    const products = await productsUtils.getProducts();
    const users = await usersUtils.getUsers();
    const orders = await ordersUtils.getOrders();

    const user_name = req.query.User_Name || '';
    const admin=req.body.Is_Admin;
    console.log('Admin cntroller:', admin);

    let foundUser;
    if (user_name && user_name !== '') {
      foundUser = await usersUtils.getUserByUserName(user_name);

      if (foundUser.Is_Admin === true)
      {
        res.render("../Views/admin.ejs", { products, users, orders, user_name, user: foundUser});
      }

      else {
        res.render("../Views/home_page.ejs", { user_name, user: foundUser});
      }
    } 
    else {
      foundUser = {};
      res.render("../Views/home_page.ejs", { products, users, user_name, user: foundUser});
    }
    
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

module.exports = {
    index
};