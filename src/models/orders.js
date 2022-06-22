const mongoose = require('mongoose')
const shortid = require('shortid')

const Orders = new mongoose.Schema({
    orderId: {
        type: String,
        default: shortid.generate(),
        unique: true
    },
    order_id: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
    },
    email: {
        String,
    },
    contactNumber: {
        type: String,
    },
    alternativeContactNumber: {
        type: String,
    },
    deliveryName: String,
    productDetails: {
        productName: String,
        amount: String,
        categoryId: String
    },
    productId: String
})

module.exports = mongoose.model("Orders", Orders)