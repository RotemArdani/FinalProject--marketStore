const {Schema, mongoose, Types} = require('mongoose');

const orderSchema = new Schema(
    {       
        _id: {type: Types.ObjectId, default: () => new Types.ObjectId()},
        UserName: {type: String, required: true},
        Products: [
            {
              Name: {type: String, required: true},
              Price: {type: Number, required: true}
            }
          ],
        SumPrice: {type: Number, required: true},
        Date: {type: Date, default: Date.now},
    }
);

module.exports = mongoose.model('Orders', orderSchema);