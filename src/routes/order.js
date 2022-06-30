const router = require('express').Router();
const Razorpay = require('razorpay')
const shortid = require('shortid')

const Order = require('./../models/orders')
const Cart = require('./../models/cart')
const Payments = require('./../models/payments');
const { ensureAuth } = require('../middlewares/auth');


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


router.post('/create-order/', ensureAuth, async(req, res) => {
    try {
        const items = await Cart.find({ email_: req.user.email })
        let products = []
        let orderTotal = 0
        for(let i = 0; i < items.length; i++){
            let productDetails = {
                name: items[i].productDetails.name,
                price: items[i].productDetails.price,
                categoryId: items[i].productDetails.categoryId,
                image: items[i].productDetails.image,
                id: items[i].productDetails.id,
                quantity: items[i].quantity,
                finalPrice: items[i].finalPrice
            };
            orderTotal += items[i].finalPrice;
            products.push(productDetails);
        }
        console.log(products)
        const amount = orderTotal;
        const currency = 'INR';

        const options = {
            amount: (amount*100).toString(),
            currency,
            receipt: shortid.generate()
        }
        const response = await razorpay.orders.create(options);

        const newOrder = new Order({
            deliveryAddress: req.body.address,
            deliveryName: req.body.name,
            order_id: response.id,
            contactNumber: req.body.number,
            pinCode: req.body.pincode,
            email_: req.user.email,
            products,
            amount
        })
        await newOrder.save()

        const newPayment = new Payments({
            email_: req.user.email,
            payment_id: shortid.generate(),
            order_id: response.id,
            receipt_id: response.receipt,
            amount: amount,
            orderId: newOrder.orderId,
        })
        await newPayment.save()
        await Cart.deleteMany({email_: req.user.email })

        return res.json({
            code: 200,
            status: 200,
            message: "Order Created! Ready for Payment",
            order: newOrder,
            payment: newPayment
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code: 500,
            error: error
        })
    }
})

module.exports = router