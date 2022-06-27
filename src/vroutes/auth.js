const router = require('express').Router()

router.get('/login', async(req, res)=>{
    return res.render('login')
})

router.get('/logout', (req, res, next) =>{
    req.logout((err) => {
        if(err) { 
            console.log(err);
            return next(err)}
    });
    res.redirect('/')
})

module.exports = router