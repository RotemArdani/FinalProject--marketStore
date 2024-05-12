const ordersUtils = require('../Utils/Orders');
const usersUtils = require('../Utils/Users');
const Order = require('../models/Orders');

const createOrder = async (req, res) => {
  try {
    const user_name = req.params.user_name;

    const user = await usersUtils.getUserByUserName(user_name);

    if (!user) {
      return res.status(404).json({ errors: ['User not found'] });
    }

    if (user.cart.length === 0)
    {
      let foundUser;
      if (user_name && user_name !== '') {
        foundUser = await usersUtils.getUserByUserName(user_name);
      } else {
        foundUser = {};
      }
      
      return res.render('../Views/home_page.ejs', { user_name , user : foundUser});
    }

    const calculateTotalPrice = () => {
      return user.cart.reduce((total, item) => total + item.Price, 0);
    };

    // Create a new order instance
    const newOrder = new Order({
        UserName: user.user_name,
        Products: user.cart,
        SumPrice: calculateTotalPrice()
    });

    // Save the new order
    await newOrder.save();

    //---------------------empty cart---------------------//
    user.cart = []; // Reset the cart to an empty array
    await user.save();

    //---------------------render---------------------//

    let foundUser;
      if (user_name && user_name !== '') {
        foundUser = await usersUtils.getUserByUserName(user_name);
      } else {
        foundUser = {};
      }
    
    return res.render('../Views/home_page.ejs', { user_name , user : foundUser});
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
};

const getOrders = async (req, res) => 
{
    const order = await ordersUtils.getOrders();
    res.json(order);
};


const deleteOrder = async (req, res) => 
{
    const order = await ordersUtils.deleteOrders(req.params.order_id);
    if (!order) 
    {
      return res.status(404).json({ errors: ['Order not found'] });
    }
    res.send();
};

module.exports = 
{
    createOrder,
    getOrders,
    deleteOrder
};