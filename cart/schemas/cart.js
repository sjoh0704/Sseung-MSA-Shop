const mongoose = require("mongoose");

const { Schema } = mongoose;
const cartSchema = new Schema({
    productId: {
        type: Number,
        required: true,
    },
    sellerId: {
        type: Number,
        required: true,
    },
    buyerId: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
// cart collection 생성.
module.exports = mongoose.model("Cart", cartSchema);
