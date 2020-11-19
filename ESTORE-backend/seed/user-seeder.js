var User = require('../models/user');
const config = require('../util/config');
var mongoose = require('mongoose');

mongoose.connect(config.dbUrl + config.dbName, {useNewUrlParser: true, useUnifiedTopology: true});

var users = [
    new User({
        "_id": mongoose.Types.ObjectId("5edd347551ff5a37a545fcf6"),
        "username":"admin",
        "password":"$2y$12$li6uLdKRT.buzJ4GkausbeGm7dYu0EkI5Kdc8k6y723Z6.k9Pw4lu",
        "firstName":"Admin",
        "lastName":" ",
        "email":"admin@miu.edu",
        "role":"Admin",
        "isApprovedUser":1,
        "points": 0,
        "birthDate":"1987-08-27T00:00:00.000Z"
    }),
    new User({
        "_id":mongoose.Types.ObjectId("5edd61d49bfd520944db61ba"),
        "username":"Karan",
        "password":"$2a$08$YvUDdLbfCiG.T237noA4ge79T7XSXDQUlEuonaVzvEcnUWkVF9Y6C",
        "firstName":"Karan",
        "lastName":"Dangre",
        "email":"karan@miu.edu",
        "role":"Buyer",
        "isApprovedUser":1,
        "points": 0,
        "birthDate":"1990-04-22T00:00:00.000Z"
    }),
    new User({
        "_id":mongoose.Types.ObjectId("5edd67bde36f3e7de8215238"),
        "username":"Pratik",
        "password":"$2a$08$AppOF9TfSF.rMonIShiYNer8Ow.4GCzB0OpClmI.wNr.krRLwZHWu",
        "firstName":"Pratik",
        "lastName":"Singh",
        "email":"Pratik@miu.edu",
        "role":"Seller",
        "isApprovedUser":1,
        "points": 0,
        "birthDate":"1990-04-22T00:00:00.000Z"
    }),
    
    new User({
        "_id":mongoose.Types.ObjectId("5ee964adcecc6d25e8c4af9e"),
        "role":"Seller",
        "username":"seller1",
        "password":"$2a$08$o3J/x1q1frIYdDEKZFAhrOZG0p6tfzUokh5cNeK5Q7x5WIk4t63j.",
        "firstName":"Peter",
        "lastName":"Seller",
        "email":"Peter@miu.edu",
        "isApprovedUser":0,
        "points": 0,
        "birthDate":"1990-04-22T00:00:00.000Z"
    })
];

var done = 0;
for (var i = 0; i < users.length; i++) {
    users[i].save(function(err, result) {
        done++;
        if (done === users.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
