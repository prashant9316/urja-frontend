require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const MongoStore = require('connect-mongo')
const app = express()

const mongoose = require('mongoose')
const path = require('path')



const passport = require('passport')
var userProfile;

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GGOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "AheNs",
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
    })
}));
app.use(passport.initialize());
app.use(passport.session());


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



const User = require('./src/models/user')

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    // callbackURL: 'https://net-se.in/auth/google/callback'
    // callbackURL: 'http://localhost:5000/auth/google/callback'
    callbackURL: process.env.GOOGLE_AUTH_REDIRECT

}, async (accessToken, refreshToken, profile, done) => {
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        email: profile.emails[0].value
    }
    try {
        let user = await User.findOne({ googleId: profile.id })
        if(user){
            done(null, user)
        } else {
            user = await User.create(newUser)
            done(null, user)
        }
    } catch (error) {
        console.error(error)
    }
}))


passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
});


app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/error'}), 
    (req, res) => {
        res.redirect('/');
    }
);

const AuthRouter = require('./src/vroutes/auth')
const IndexRouter = require('./src/vroutes/index')
const OrderRouter = require('./src/routes/order')
const RazorpayRouter = require('./src/routes/payments')
const CartRouter = require('./src/routes/cart')




app.use('/', AuthRouter)
app.use('/', IndexRouter)
app.use('/', OrderRouter)
app.use('/', RazorpayRouter)
app.use('/cart/', CartRouter)


app.listen(process.env.PORT, () => {
    console.log(`Open on http://${process.env.HOST}:${process.env.PORT}`)
})