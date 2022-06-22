const router = require('express').Router();
const Razorpay = require('razorpay')
const shortid = require('shortid')


const Payments = require('./../models/payments')
const Orders = require('./../models/orders')

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


router.post('/razorpay', async(req, res) => {
    try {
        console.log(req.body)
        const order = await Orders.findOne({ orderId: req.body.orderId })
        if(order.order_id != null){
            return res.json({
                id: order.orderId,
                currency: 'INR',
                amount: (order.amount * 100)
            })
        }
        const amount = order.amount;
        const currency = 'INR';

        const options = {
            amount: (amount*100).toString(),
            currency,
            receipt: shortid.generate()
        }

        try {
            const response = await razorpay.orders.create(options);
            const udpatedOrder = await Orders.findOneAndUpdate({
                orderId: req.params.order_id
            }, {
                $set: {
                    order_id: response.id
                }
            }, {
                new: true
            })

            const newPayment = new Payments({
                order_id: response.id,
                receipt_id: response.receipt,
                orderId: udpatedOrder.orderId,
                amount: order.amount
            })
            await newPayment.save();
            return res.json({
                id: response.id,
                currency: response.currency,
                amount: response.amount
            })
        } catch (error) {
            console.log(error);
            return res.send("error!: " + error)
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
})


module.exports = router;