const router = require('express').Router()
const axios = require('axios')


router.get('/:categoryId/product', async(req, res) => {
    const url = `${process.env.BACKEND_API_ROUTE}${req.params.categoryId}/product`
    axios.get(url)
    .then(result => {
        console.log(`statusCode: ${result.status}`)
        console.log(result.data.data)
        return res.json({
            status: result.status,
            data: result.data.data
        })
    })
    .catch(error=>{
        console.error(error)
        return {
            status: 500,
            error: error
        }
    })
})


module.exports = router