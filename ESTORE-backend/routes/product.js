const express = require('express');
const ApiResponse = require('../models/api.response');
const Product = require('../models/product');
const Order = require('../models/order');
const authorize = require('../middleware/authorize');
const Role = require('../models/user').Roles;
const router = express.Router();

router.get('/', getAll);
router.post('/', authorize(Role.SELLER), save);
router.get('/seller', authorize(Role.SELLER), getBySeller);
router.get('/reviews', authorize(Role.ADMIN), getAllReviews);
router.put('/reviews/add/:id', insertReview);
router.put('/approve-review', authorize(Role.ADMIN), approveReview);
router.get('/:id', getById);
router.put('/:id', authorize(Role.SELLER), update);
router.delete('/:id', authorize(Role.SELLER), deleteById);


function getAllReviews(req, res, next) {
    Product.find({$and: [{'reviews.approved': false}, {'reviews.buyer': {$exists: true}}]},
        {title: 1, 'reviews.description': 1, 'reviews.rating': 1, 'reviews.buyer': 1, 'reviews.approved': 1})
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
}

function approveReview(req, res, next) {
    Product.updateOne(
        {_id: req.body.prodctId, 'reviews.buyer': req.body.userId},
        {$set: {'reviews.$.approved': 1}})
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
}

function getAll(req, res, next) {
    Product.find({}, function (err, products) {
        if (err) return res.sendStatus(404);
        res.status(200).json(products);
    }).populate("seller");
}

function getBySeller(req, res, next) {
    Product.find({seller: req.user.userId}, function (err, products) {
        if (err) return res.sendStatus(404);
        return res.status(200).json(products);
    });
}

function save(req, res, next) {
    let product = new Product(req.body);
    product.seller = req.user.userId;

    product.save(function (err) {
        if (err) return res.status(400).json({message: 'Saving error'});
        res.status(201).json({message: 'Created'});
    });
}

function getById(req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return res.sendStatus(404);
        if (!product) res.sendStatus(404);
        res.status(200).json(product);
    });
}

function update(req, res, next) {
    Product.updateOne({_id: req.params.id}, req.body, function (err) {
        if (err) return res.status(500).json(err);
        res.sendStatus(204);
    });
}

function deleteById(req, res, next) {
    Order.findOne({'products.id': req.params.id}, function (err, result) {
        if (result) {
            return res.status(403).json({message: 'Can not delete product because its inside an order'});
        }

        Product.deleteOne({_id: req.params.id}, function (err) {
            if (err) res.sendStatus(404);
            res.status(204).json({message: 'Deleted successfully'});
        });
    });

}

function insertReview(req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return res.status(500).json(err);
        product.reviews.push(req.body);
        product.save(function (err) {
            if (err) return res.status(500).json(err);
            res.sendStatus(204);
        });

    });
}


module.exports = router;
