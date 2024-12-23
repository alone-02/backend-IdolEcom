const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },   
    addedDate: {
        type: Date,
        default: Date.now,
    }
});


cartSchema.virtual("id").get(function () {
    // console.log(this._id.toHexString());
    return this._id.toHexString();
});

cartSchema.set("toJSON", {
    virtuals: true,
});

const Cart = mongoose.models.cartSchema || mongoose.model("Cart", cartSchema);

//const Order = mongoose.model("Order", orderSchema);

module.exports = Cart; 