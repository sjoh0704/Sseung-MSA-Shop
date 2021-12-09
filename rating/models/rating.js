const mongoose = require("mongoose");

const { Schema } = mongoose;
const ratingSchema = new Schema({
    userId: {
        type: Number,
        unique: true,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
        default: 36.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    celcius: {
        type: Boolean,
        default: true,
    },
});
// cart collection 생성.
module.exports = mongoose.model("Rating", ratingSchema);
