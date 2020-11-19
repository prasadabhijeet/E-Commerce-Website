const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const authorize = require('../middleware/authorize');
const Role = require('../models/user').Roles;
const ApiResponse = require('../models/api.response');

router.get('/', authorize([Role.BUYER, Role.SELLER]), getOrder);
router.get('/get-by-buyer', authorize([Role.BUYER, Role.SELLER]), getByBuyerId);
router.post('/', authorize(Role.BUYER), postOrder);
router.get('/seller', authorize(Role.SELLER), getBySeller);
router.get('/buyer', authorize(Role.BUYER), getByBuyer);
router.get('/:id', getById);
router.put('/:id', authorize([Role.SELLER, Role.BUYER]), update);

 function getOrder (req, res, next) {
    const cart = req.session.cart;

    res.status(200).json(cart);
}

function getByBuyerId(req, res, next) {
    Order.find({buyer: req.user.userId}, function (err, orders) {
        if(err) res.sendStatus(404);
        res.status(200).json(orders);
    }).populate('seller');
}

function postOrder(req, res, next) {
    // if (!req.session.cart) {
    //     return res.redirect('/cart');
    // }
    //const cart = req.session.cart;
    let orders =  [];
    orders = req.body;

    Order.insertMany(orders, function (err, result) {
        req.session.cart = null;
        if (err) {
            return res.status(400).json({message: 'Saving error'});
            console.log(err);
          }else{
            console.log(result);
          }
          
          return res.status(201).json({message: 'Created'});
    });
}

function getBySeller(req, res, next) {
    Order.find({seller: req.user.userId}, function (err, orders) {
        if(err) return res.sendStatus(404);
        res.status(200).json(orders);
    }).populate('buyer');
}

function getByBuyer(req, res, next) {
    Order.find({buyer: req.user.userId}, function (err, orders) {
        if(err) return res.sendStatus(404);
        res.status(200).json(orders);
    }).populate('seller');
}

function update(req, res, next) {
    Order.updateOne({_id: req.params.id}, req.body, function (err) {
        if(err) return res.status(500).json(err);
        res.sendStatus(204);
    });
}

function getById(req, res, next) {
    Order.findById(req.params.id, function (err, order) {
        if(err) return res.sendStatus(404);
        res.status(200).json(new ApiResponse(200, 'ok', order));
    });
}

module.exports = router;
