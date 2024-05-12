const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        First_Name: {type: String, required: true},
        Last_Name: {type: String, required: true},
        User_Name: {type: String, required: true, min: 6, max: 255 ,unique : true},
        Password: {type: String, required: true, max: 1024, min: 6},
        City: {type: String, required: true},
        Address: {type: String, required: true},
        Gender:{type: String, enum: ['Male', 'Female'], required: true},
        Is_Admin: {type: Boolean, required: true , default: false},
        Cart: [{
            ProductId: {type: Number, required: true},
            ProductName: {type: String, required: true},
            Price: {type: Number, required: true}
          }]
    }
);

module.exports = mongoose.model('Users', userSchema);