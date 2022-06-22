const Order = require('../models/orders')

const router = require('express').Router()


router.get('/', (req, res) => {
    return res.render('index')
})



router.get('/electric-vehicles', (req, res) => {
    return res.render('ev-page')
})



router.get('/products', (req, res) => {
    return res.render('products')
})


router.get('/products/:id', (req, res) => {
    return res.render('categories', {
        categoryId: req.params.id
    })
})


router.get('/product/:categoryId/:productId', (req, res) => {
    return res.render('product', {
        categoryId: req.params.categoryId,
        productId: req.params.productId
    })
})


router.post('/order-details/:orderId', (req, res) => {
    return res.redirect(`/order-details/${req.params.orderId}`)
})

router.get('/order-details/:orderId', async(req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId })
        if(!order){
            throw "Order Not found!"
        }
        return res.render('order-details', {
            order
        })    
    } catch (error) {
        return res.redirect('/')
    }
})

router.get('/about', (req, res) => {
    return res.render('about')
})


router.get('/about-ceo', (req, res) => {
    return res.render('ceo')
})


router.get('/board-of-directors', (req, res) => {
    return res.render('board-directors')
})


router.get('/key-positions', (req, res) => {
    return res.render('key-positions')
})

router.get('/projects', (req, res) => {
    return res.render('projects')
})


router.get('/contact', (req, res) => {
    return res.render('contact')
})



router.get('/categories', (req, res) => {
    return res.render('categories')
})



router.get('/solar-projects', (req, res) => {
    return res.render('solar-projects')
})



router.get('/business-partners', (req, res) => {
    return res.render('business-partners')
})



router.get('/company-overview', (req, res) => {
    return res.render('company-overview')
})



router.get('/vision-and-mission', (req, res) => {
    return res.render('vision-mission')
})



router.get('/franchisee', (req, res) => {
    return res.render('franchisee')
})



router.get('/blog', (req, res) => {
    return res.render('blogs')
})



router.get('/gallery', (req, res) => {
    return res.render('gallery')
})



router.get('/cart', (req, res) => {
    return res.render('cart')
})



router.get('/terms-and-conditions', (req, res) => {
    return res.render('tnc')
})



router.get('/privacy-policy', (req, res) => {
    return res.render('privacy')
})



router.get('/refund-policy', (req, res) => {
    return res.render('refund-policy')
})



router.get('/career', (req, res) => {
    return res.render('career')
})



router.get('/prodcts/:id', (req, res) => {
    return res.render('product')
})



module.exports = router;