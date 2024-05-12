const usersUtils = require('../Utils/Users');

const getCart = async (req, res) => {

    const user_name = req.query.user_name || '';

    const user = await usersUtils.getUserByUserName(user_name);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }

    const cart = user.cart;

    let foundUser;
    if (user_name && user_name !== '') 
    {
      foundUser = await usersUtils.getUserByUserName(user_name);
    } else {
      foundUser = {};
    }

    res.render("../Views/cart.ejs", { User_Name: user_name, cart: cart , user: foundUser});
};

const resetCart = async (req, res) => {
  const user_name = req.params.user_name || '';

  const user = await usersUtils.getUserByUserName(user_name);
  if (!user) {
    return res.status(404).json({ errors: ['User not found'] });
  }

  user.cart = [];
  await user.save();

  res.status(200).json({ message: 'Cart reset successfully' });
};

module.exports = {
  getCart,
  resetCart,
};