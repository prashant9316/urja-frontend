const router = require('express').Router();
const Razorpay = require('razorpay')
const shortid = require('shortid')

const Order = require('./../models/orders')
const Payments = require('./../models/payments')


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


router.post('/create-order/:categoryId/:productId', async(req, res) => {
    try {
        console.log(req.params)
        console.log(req.body)

        const amount = req.body.productDetails.price;
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
            email: req.body.email,
            productId: req.body.productDetails.id,
            productDetails: {
                productName: req.body.productDetails.name,
                amount: req.body.productDetails.price,
                categoryId: req.body.productDetails.categoryId
            }
        })
        await newOrder.save()

        const newPayment = new Payments({
            payment_id: shortid.generate(),
            order_id: response.id,
            receipt_id: response.receipt,
            amount: amount,
            orderId: newOrder.orderId,
        })
        await newPayment.save()
        return res.json({
            code: 200,
            status: 200,
            message: "Order Created! Ready for Payment",
            order: newOrder
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