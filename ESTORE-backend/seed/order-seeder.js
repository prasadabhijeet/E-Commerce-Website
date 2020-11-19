var Order = require('../models/order');
const config = require('../util/config');
var mongoose = require('mongoose');

mongoose.connect(config.dbUrl + config.dbName, {useNewUrlParser: true, useUnifiedTopology: true});

var orders = [ 
    new Order({
    "_id": mongoose.Types.ObjectId("5eec0e7010a32f60b0664c81"),
    "totalPrice": 33,
    "subTotalPrice": 30,
    "shippingPrice": 3,
    "status": "Pending",
    "products": [
      {
        "id": "5eec0d3b50c8e05d085e2abf",
        "title": "Green Coat",
        "price": 30,
        "qty": 1,
        "imagePath": "https://colorlib.com/preview/theme/estore/assets/img/categori/product2.png",
        "seller": "5edd67bde36f3e7de8215238"
      }
    ],
    "billingAddress": {
      "_id": mongoose.Types.ObjectId("5eec0e7010a32f60b0664c82"),
      "firstName": "Ahmad",
      "lastName": "Awad",
      "phone": "+962796249541",
      "city": "Fairfield",
      "email": "aawad@miu.edu",
      "streetAddress": "1000 N 4th St",
      "zipCode": "52557"
    },
    "shippingAddress": {
      "_id": mongoose.Types.ObjectId("5eec0e7010a32f60b0664c83"),
      "firstName": "Ahmad",
      "lastName": "Awad",
      "phone": "+962796249541",
      "city": "Fairfield",
      "email": "aawad@miu.edu",
      "streetAddress": "1000 N 4th St",
      "zipCode": "52557"
    },
    "buyer": mongoose.Types.ObjectId("5edd61d49bfd520944db61ba"),
    "coupon": {
      "percentage": 0.1,
      "_id": mongoose.Types.ObjectId("5eec0e7010a32f60b0664c84"),
      "code": "",
      "description": "",
      "expiryDate": "2020-06-19T01:01:36.034Z",
      "seller": mongoose.Types.ObjectId("5ee964adcecc6d25e8c4af9e")
    },
    "payment": {
      "status": "Done",
      "_id": mongoose.Types.ObjectId("5eec0e7010a32f60b0664c85"),
      "date": "2020-06-19T01:01:36.034Z",
      "amount": 127.6,
      "paymentMethod": "CreditCard"
    },
    "purchaseDate": "2020-06-19T01:01:36.034Z",
    "seller": mongoose.Types.ObjectId("5edd67bde36f3e7de8215238")
    }),

    new Order({
    "_id": mongoose.Types.ObjectId("5eec0e7010a32f60b0664c86"),
    "totalPrice": 94.6,
    "subTotalPrice": 86,
    "shippingPrice": 8.6,
    "status": "Pending",
    "products": [
      {
        "id": "5eec0d3b50c8e05d085e2ac5",
        "title": "Dark Sweatshirt",
        "price": 50,
        "qty": 1,
        "imagePath": "https://colorlib.com/preview/theme/estore/assets/img/categori/product5.png",
        "seller": "5ee964adcecc6d25e8c4af9e"
      },
      {
        "id": "5eec0d3b50c8e05d085e2ac2",
        "title": "Jeans Blazer",
        "price": 36,
        "qty": 1,
        "imagePath": "https://colorlib.com/preview/theme/estore/assets/img/categori/product6.png",
        "seller": "5ee964adcecc6d25e8c4af9e"
      }
    ],
    "billingAddress": {
      "_id": mongoose.Types.ObjectId("5eec0e7010a32f60b0664c87"),
      "firstName": "Ahmad",
      "lastName": "Awad",
      "phone": "+962796249541",
      "city": "Fairfield",
      "email": "aawad@miu.edu",
      "streetAddress": "1000 N 4th St",
      "zipCode": "52557"
    },
    "shippingAddress": {
      "_id": mongoose.Types.ObjectId("5eec0e7010a32f60b0664c88"),
      "firstName": "Ahmad",
      "lastName": "Awad",
      "phone": "+962796249541",
      "city": "Fairfield",
      "email": "aawad@miu.edu",
      "streetAddress": "1000 N 4th St",
      "zipCode": "52557"
    },
    "buyer": mongoose.Types.ObjectId("5edd61d49bfd520944db61ba"),
    "coupon": {
      "percentage": 0.1,
      "_id": mongoose.Types.ObjectId("5eec0e7010a32f60b0664c89"),
      "code": "",
      "description": "",
      "expiryDate": "2020-06-19T01:01:36.034Z",
      "seller": mongoose.Types.ObjectId("5ee964adcecc6d25e8c4af9e")
    },
    "payment": {
      "status": "Done",
      "_id": mongoose.Types.ObjectId("5eec0e7010a32f60b0664c8a"),
      "date": "2020-06-19T01:01:36.034Z",
      "amount": 127.6,
      "paymentMethod": "CreditCard"
    },
    "purchaseDate": "2020-06-19T01:01:36.034Z",
    "seller": mongoose.Types.ObjectId("5ee964adcecc6d25e8c4af9e")
  })
];

var done = 0;
for (var i = 0; i < orders.length; i++) {
    orders[i].save(function(err, result) {
        done++;
        if (done === orders.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}