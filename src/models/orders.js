const mongoose = require('mongoose')
const shortid = require('shortid')

const Orders = new mongoose.Schema({
    email_: {
        type: String,
        required: true
    },
    name: {
        type: String
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
        name: String,
        price: String,
        quantity: Number,
        categoryId: String,
        id: String,
        image: String,
        finalPrice: Number
    }],
    amount: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Orders", Orders)