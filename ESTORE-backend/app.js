const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const errorHandler = require('./middleware/errorHandler');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const config = require('./util/config');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();

mongoose.connect(config.dbUrl + config.dbName, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(config.port, () => {
            console.log('Running on ' + config.port);
        });
    }).catch(err => console.error(err));

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,

}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 180 * 60 * 1000 } // 3 hours}
}));

app.use(authRoutes);
app.use('/users/', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', orderRoutes);

app.use(errorHandler);
