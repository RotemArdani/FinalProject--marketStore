const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema(
    {
        CategoryId: {type: Number, required: true },
        CategoryName: {type: String, required: true },
        Per: {type: String, required: true },
    }
);

module.exports = mongoose.model('Categories', categorySchema);