const mongoose = require('mongoose')

const Payments = new mongoose.Schema({
    payment_id: {
        type: String
    },
    order_id: {
        type: String,
        required: true,
        unique: true
    },
    receipt_id: {
        type: String,
        required: true,
        unique: true
    },
    orderId: {
        type: String,
    },
    amount: {
        type: Number
    },
    payeeDetails: {
        type: String
    }
})

module.exports = mongoose.model("Payments", Payments)