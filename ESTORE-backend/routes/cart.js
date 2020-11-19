const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');

router.get('/add/:id', function (req, res, next) {
    Product.findById(req.params.id)
        .then(product => {
            Cart.addToCart(product);
            Cart.saveCart(req);
            res.sendStatus(204);
        })
        .catch(err => console.log(err));
});

router.get('/', function (req, res, next) {
    var cart = req.session.cart;

    if (!cart) {
        return res.status(200).json();
    }

    res.status(200).json(cart);
});

router.get('/clear', function (req, res, next) {
    Cart.clear(req);
    res.status(204).json();
})

module.exports = router;
