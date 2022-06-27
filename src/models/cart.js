const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    email_: {
        type: String,
        reqiured: true
    },
    productDetails: {
        name: String,
        description: String,
        price: String,
        categoryId: String,
        id: String,
        image: String
    },
    quantity: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number,
        required: true,
    }
});

module.exports = new mongoose.model('Cart', CartSchema)