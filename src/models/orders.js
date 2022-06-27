const mongoose = require('mongoose')
const shortid = require('shortid')

const Orders = new mongoose.Schema({
    email_: {
        type: String,
        required: true
    },
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
    products: [{
        productDetails: {
            productName: String,
            amount: String,
            quantity: Number,
            categoryId: String,
            productId: String
        },
    }],
    amount: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Orders", Orders)