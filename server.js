require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

const mongoose = require('mongoose')
const path = require('path')


// Setting CORS
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    credentials: true
}
app.use(cors(corsOpts))

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"))


mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    ()=> console.log("connected to db!")
)

const IndexRouter = require('./src/vroutes/index')


app.use('/', IndexRouter)


app.listen(process.env.PORT, () => {
    console.log(`Open on http://${process.env.HOST}:${process.env.PORT}`)
})