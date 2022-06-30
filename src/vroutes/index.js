const { ensureAuth } = require('../middlewares/auth')
const Order = require('../models/orders')
const Cart = require('./../models/cart')

const router = require('express').Router()


router.get('/', (req, res) => {

    return res.render('index', {
        user: req.user
    })
    
})


router.get('/2', (req, res) => {
    return res.render('index-2')
})



router.get('/electric-vehicles', (req, res) => {
    return res.render('ev-page', {
        user: req.user
    })
})



router.get('/products', (req, res) => {
    return res.render('products', {
        user: req.user
    })
})


router.get('/products/:id', (req, res) => {
    return res.render('categories', {
        categoryId: req.params.id,
        user: req.user
    })
})


router.get('/product/:categoryId/:productId', (req, res) => {
    return res.render('product', {
        categoryId: req.params.categoryId,
        productId: req.params.productId,
        user: req.user
    })
})


router.get('/cart', ensureAuth, async(req, res) => {
    try {
        const items = await Cart.find({ email_: req.user.email })
        return res.render('cart', {
            user: req.user,
            items
        })
    } catch (error) {
        return res.redirect('/')
    }
    
})



router.get('/my-orders', ensureAuth, async(req, res) => {
    try {
        const orders = await Order.find({ email_: req.user.email })
        return res.render('my-order', {
            orders,
            user: req.user
        })
    } catch (error) {
        
    }
})


router.post('/orders', (req, res) => {
    return res.redirect(`/orders`, {
        user: req.user
    })
})

router.get('/orders', ensureAuth, async(req, res) => {
    try {
        const orders = await Order.find({ email_: req.user.email })
        console.log(orders)
        return res.render('my-order', {
            user: req.user,
            orders
        })
    } catch (error) {
        return res.redirect('/')
    }
})

router.get('/order-details/:orderId', async(req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId })
        if(!order){
            throw "Order Not found!"
        }
        return res.render('order-details', {
            order,
            user: req.user
        })    
    } catch (error) {
        return res.redirect('/')
    }
})

router.get('/about', (req, res) => {
    return res.render('about', {
        user: req.user
    })
})


router.get('/about-ceo', (req, res) => {
    return res.render('ceo', {
        user: req.user
    })
})


router.get('/board-of-directors', (req, res) => {
    return res.render('board-directors', {
        user: req.user
    })
})


router.get('/key-positions', (req, res) => {
    return res.render('key-positions', {
        user: req.user
    })
})

router.get('/projects', (req, res) => {
    return res.render('projects', {
        user: req.user
    })
})


router.get('/contact', (req, res) => {
    return res.render('contact', {
        user: req.user
    })
})



router.get('/categories', (req, res) => {
    return res.render('categories', {
        user: req.user
    })
})



router.get('/solar-projects', (req, res) => {
    return res.render('solar-projects', {
        user: req.user
    })
})



router.get('/business-partners', (req, res) => {
    return res.render('business-partners', {
        user: req.user
    })
})



router.get('/company-overview', (req, res) => {
    return res.render('company-overview', {
        user: req.user
    })
})



router.get('/vision-and-mission', (req, res) => {
    return res.render('vision-mission', {
        user: req.user
    })
})



router.get('/franchisee', (req, res) => {
    return res.render('franchisee', {
        user: req.user
    })
})



router.get('/blog', (req, res) => {
    return res.render('blogs', {
        user: req.user
    })
})



router.get('/gallery', (req, res) => {
    return res.render('gallery', {
        user: req.user
    })
})




router.get('/terms-and-conditions', (req, res) => {
    return res.render('tnc', {
        user: req.user
    })
})



router.get('/privacy-policy', (req, res) => {
    return res.render('privacy', {
        user: req.user
    })
})



router.get('/refund-policy', (req, res) => {
    return res.render('refund-policy', {
        user: req.user
    })
})



router.get('/career', (req, res) => {
    return res.render('career', {
        user: req.user
    })
})



router.get('/prodcts/:id', (req, res) => {
    return res.render('product', {
        user: req.user
    })
})





module.exports = router;