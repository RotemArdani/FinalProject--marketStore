const usersUtils = require('../Utils/Users');

const index = async (req, res) => {
    const user_name = req.query.user_name || '';

    let foundUser;
    if (user_name && user_name !== '') {
        foundUser = await usersUtils.getUserByUserName(user_name);
    } else {
      foundUser = {};
    }
    
    res.render("../Views/home_page.ejs", { user_name, user: foundUser});
};
  
  module.exports = {
    index
};