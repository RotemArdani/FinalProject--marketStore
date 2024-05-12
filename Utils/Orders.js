const Order = require('../models/Orders');

const createOrder = async (user_name, products, sum_price) => {
  const newOrder = new Order({
    UserName: user_name,
    Products: products,
    SumPrice: sum_price
  });

  try {
    const savedOrder = await newOrder.save();
    return savedOrder;
  }
  catch (error) {
    console.error(error);
    throw new Error('Failed to create order');
  }
};

const getOrders = async () => {
    return await Order.find({});
};

const getOrderById = async (order_id) => {
  return await Order.findOne({ '_id': order_id });
};

const deleteOrders = async (order_id) => {
      const deletedorder = await Order.findByIdAndRemove(order_id);
      return deletedorder;
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    deleteOrders
}