const User = require('../models/Users')

const createUser = async (first_name, last_name, user_name, password, city, address, gender, is_admin) => {
    const user = new User({
        First_Name: first_name,
        Last_Name: last_name,
        User_Name: user_name,
        Password: password,
        City: city,
        Address: address,
        Gender: gender,
        Is_Admin: is_admin
    });
    try {
        const savedUser = await user.save();
        return savedUser;
      }
      catch (error) {
        console.error(error);
        throw new Error('Failed to create user');
      }
  };

  const getUserByUserName = async (user_name) => {
    const index = async (req, res) => {
  try {
    const products = await productsUtils.getProducts();
    const user_name = req.query.User_Name || '';
    //const search = req.query.search || '';
    console.log('user_name:', user_name);

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
    return await User.findOne({User_Name: user_name });
  };

const getUsers = async () => {
    return await User.find({});
};

const updateFirstName = async (user_name, first_name) => {
    const user = await getUserByUserName(user_name);
    if (!user)
        return null;

    user.First_Name = first_name;
    await user.save();
    return user;
};

const updateLastName = async (user_name, last_name) => {
    const user = await getUserByUserName(user_name);
    if (!user)
        return null;

    user.Last_Name = last_name;
    await user.save();
    return user;
};

const updatePassword = async (user_name, password) => {
    const user = await getUserByUserName(user_name);
    if (!user)
        return null;

    user.Password = password;
    await user.save();
    return user;
};

const updateCart = async (user_name, cart) => {
    const user = await getUserByUserName(user_name);
    if (!user) {
      return null;
    }
  
    user.Cart.push(cart);
    await user.save();
    return user;
  };

const updateCity = async (user_name, city) => {
    const user = await getUserByUserName(user_name);
    if (!user)
        return null;

    user.City = city;
    await user.save();
    return user;
};

const updateAddress = async (user_name, address) => {
    const user = await getUserByUserName(user_name);
    if (!user)
        return null;

    user.Address = address;
    await user.save();
    return user;
};

const updateIsAdmin = async (user_name, is_admin) => {
    const user = await getUserByUserName(user_name);
    if (!user)
        return null;

    user.Is_Admin = is_admin;
    await user.save();
    return user;
};

const deleteUser = async (user_name) => {
    const user = await getUserByUserName(user_name);
    if (!user)
        return null;

        const deletedUser = await User.findByIdAndRemove(user.User_Name);
        return deletedUser;
};

module.exports = {
    createUser,
    getUserByUserName,
    getUsers,
    updateFirstName,
    updateLastName,
    updatePassword,
    updateCart,
    updateCity,
    updateAddress,
    updateIsAdmin,
    deleteUser,
}