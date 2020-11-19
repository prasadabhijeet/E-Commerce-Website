const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ApiResponse = require('../models/api.response');
const authorize = require('../middleware/authorize');
const Role = require('../models/user').Roles;

router.get('/', authorize(Role.ADMIN), getAll);
router.get('/SellerByStatus/:isApprovedUser', authorize(Role.ADMIN), getAllSellerByStatus);

function getAll(req, res, next) {
    User.find()
        .then(users => {
            res.status(200).send(new ApiResponse(200, 'success', users));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
}

function getAllSellerByStatus (req, res, next) {
    User.find({$and:[{isApprovedUser: req.params.isApprovedUser},{role: "Seller"}]})
        .then(users => {
            res.status(200).send(new ApiResponse(200, 'success', users));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
}

router.post('/', async (req, res, next) => {

    User.addUser(req.body)
        .then(result => {
            res.status(201).send(new ApiResponse(201, 'success', result));
        })
        .catch(err => {
            // res.status(500).send(new ApiResponse(500, 'error', err));
            res.status(409).send(new ApiResponse(409, 'Duplicate', "User Name already exists!"));
        });

});

router.put('/approveUser/:id', (req, res, next) => {
    User.findByIdAndUpdate({_id: req.params.id}, {$set:{isApprovedUser: req.body.ApprovedUser}})
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
});

router.get('/aggregate', (req, res, next) => {
    User.aggregate([
        { $group: { _id: "$role", sum_users: { $sum: 1 } } }
    ])
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
});

router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
});

router.put('/:userId', (req, res, next) => {
    
    User.updateOne({_id: req.params.userId}, {$set:{points: req.body.points}}, function (err) {
        if (err) return res.status(500).json(err);
        return res.sendStatus(200);
    });
    
    // User.findById(req.params.userId)
    //     .then(user => {
    //         //const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    //         //user.password = hashedPassword;
    //         // user.firstName = req.body.firstName;
    //         // user.lastName = req.body.lastName;
    //         // user.email = req.body.email;
    //         // user.birthDate = req.body.birthDate;
    //         // user.role = req.body.role;
    //         user.points = req.body.points;

    //         return user.save();
    //     })
    //     .then(result => {
    //         res.status(200).send(new ApiResponse(200, 'success', result));
    //     });
});

router.delete('/:userId', (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
});


module.exports = router;