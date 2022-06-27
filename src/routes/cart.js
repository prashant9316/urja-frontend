const router = require('express').Router()
const { ensureAuth } = require('../middlewares/auth');
const Cart = require('./../models/cart')

router.post('/add-item', ensureAuth, async(req, res) => {
    try {
        console.log("hello")
        const {productDetails, quantity} = req.body;
        const newItem = new Cart({ productDetails, quantity, email_: req.user.email, finalPrice: productDetails.price })
        if(productDetails == ''){
            res.redirect('/')
        }
        await newItem.save()
        return res.json({
            code: 200,
            status: 200,
            message: "Item Added to Cart"
        })
    } catch (error) {
        console.log("ERROR: "+error)
        return res.status(500).json({
            error: "SERVER ERROR OCCURED"
        })
    }
    
})


router.post('/update-item/:_id', async(req, res) => {
    try {
        const {_id} = req.params;
        const item = await Cart.findOne({_id})
        console.log(req.body)
        const finalPrice=item.productDetails.price * req.body.quantity;
        const updateItem = await Cart.findOneAndUpdate({_id}, {
            $set: {
                quantity: req.body.quantity,
                finalPrice
            }
        })
        return res.status(200).json({
            code: 200,
            message: "Updated the quantity",
            finalPrice
        })
    } catch (error) {
        return res.status(500).json({
            error: "SERVER ERROR OCCURED"
        })
    }
})


router.post('/remove-item/:_id', async(req, res) => {
    try {
        const {_id} = req.params;

        const item = await Cart.deleteOne({_id})
        return res.status(200).json({
            code: 200,
            message: "Deleted Successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            error: "SERVER ERROR OCCURED"
        })
    }
})

module.exports = router;