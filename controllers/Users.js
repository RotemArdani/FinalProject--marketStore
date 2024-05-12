const usersUtils = require('../Utils/Users');
const productsUtils = require('../Utils/Products');

// sign-up
const createUser = async (req, res) => {
  const user_name = req.body.User_Name;

  // Check if the user already exists
  const existingUser = await usersUtils.getUserByUserName(user_name);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  // Check if isadmin field exists in req.body, otherwise set it to false
  //if (!req.body.hasOwnProperty('is_admin')) {
    //req.body.is_admin = 'false';
  //}

  //const is_admin = req.body.is_admin === 'true'; // Convert isadmin to a boolean

  const newUser = await usersUtils.createUser(
    req.body.First_Name,
    req.body.Last_Name,
    user_name,
    req.body.Password,
    req.body.City,
    req.body.Address,
    req.body.Gender,
    req.body.Is_Admin
  );
if (!newUser)
{
  return res.status(400).json({ error: 'Cannot Create New User' });
}
  res.status(200).json({ message:'User created successfully!' });
};

const getUsers = async (req, res) => {
    const users = await usersUtils.getUsers({});
    res.json(users);
};

const getUser = async (req, res) => {
    const user = await usersUtils.getUserByUserName(req.params.User_Name);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};

const updateUser = async (req, res) => {   
    if (!req.body.User_Name) {
      res.status(400).json({
        message: "User_Name is required",
      });      
    }
  
    if (req.body.First_Name) 
    {
        user = await usersUtils.updateFirstName(req.body.User_Name, req.body.First_Name);
        if (!user) {
           return res.status(404).json({ errors: ['Could not update'] });
        }
    };

    if (req.body.Last_Name) 
    {
        user = await usersUtils.updateLastName(req.body.User_Name, req.body.Last_Name);
        if (!user) {
           return res.status(404).json({ errors: ['Could not update'] });
        }
    };

    if (req.body.Password) 
    {
        user = await usersUtils.updatePassword(req.body.User_Name, req.body.Password);
        if (!user) {
           return res.status(404).json({ errors: ['Could not update'] });
        }
    };

    if (req.body.City) {
        user = await usersUtils.updateCity(req.body.User_Name, req.body.City);
        if (!user) {
            return res.status(404).json({ errors: ['Could not update'] });
        }   
    };

    if (req.body.Address) {
        user = await usersUtils.updateAddress(req.body.User_Name, req.body.Address);
        if (!user) {
           return res.status(404).json({ errors: ['Could not update'] });
        }     
    };

    if (req.body.Is_Admin) {
        user = await usersUtils.updateIsAdmin(req.body.User_Name, req.body.Is_Admin);
        if (!user) {
            return res.status(404).json({ errors: ['Could not update'] });
        }
    };

    if (req.body.Cart) {
        product = await productsUtils.getProductById(req.body.Cart.ProductId);
        if(product.Quantity !== 0)
        {
            const updated = productsUtils.updateQuantity(req.body.Cart.ProductId, product.Quantity-1);
            if(!updated)
            {
                return res.status(404).json({ errors: ['Could not update Quantity'] });
            }

            user = await usersUtils.updateCart(req.body.User_Name, req.body.Cart);
            if (!user) {
                return res.status(404).json({ errors: ['Could not update cart'] });
            }
            return res.status(200).json({ message: `Product added to cart` });
        }
        return res.status(404).json({ errors: ['No Quantity'] });
    }

    res.status(200).json({ message:'User updated successfully!' });
};

const addtocart = async (req, res) => {
    const user = await usersUtils.getUserByUserName(req.body.User_Name);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};

const deleteUser = async (req, res) => {
    const user = await usersUtils.deleteUser(req.params.User_Name);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.send();
};

const loginUser = async (req, res) => {
    const { User_Name, Password } = req.body;
    const user = await usersUtils.getUserByUserName(User_Name);
    
    if (!user || user.Password !== Password) {
        return res.status(401).json({ error: 'Wrong Username / Password' });
    }
    const user_UserName = user.User_Name;
    res.json({ User_Name: user_UserName });
};
  
const removeProductFromCart = async (req, res) => {
    const { User_Name, product_id } = req.body;

    try {
        const user = await usersUtils.getUserByUserName(User_Name);

        if (!user) {
            return res.status(404).json({ error: 'Could not find user' });
        }

        const cart = user.Cart;
        const index = cart.findIndex(item => item.ProductId === product_id);

        if (index === -1) {
            return res.status(404).json({ error: 'Product not found in the cart' });
        }

        cart.splice(index, 1);
        await user.save();

        var product = await productsUtils.getProductById(product_id);
        product = productsUtils.updateQuantity(product_id, product.Quantity + 1);
        if (!product){
            return res.status(404).json({ error: 'Could not update quantity' });
        }

    res.json({ success: true });

} catch (error) {
    console.error('Error removing product from cart: ', error);
    res.status(500).json({ error: 'An error occurred while removing the product from the cart' });
}
};
  
  module.exports = {
    createUser,
    getUsers ,
    getUser,
    updateUser,
    addtocart,
    deleteUser,
    loginUser,
    removeProductFromCart
  };