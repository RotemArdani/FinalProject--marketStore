const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
    {
        CategoryId: {type: Number, required: true},
        ProductName: {type: String, required: true},
        ProductId: {type: Number, required: true, unique : true},
        Price: {type: Number, required: true},
        Quantity: {type: Number, required: true},
        Image: {type: String, required: true},
    }
);

module.exports = mongoose.model('Products', productSchema);