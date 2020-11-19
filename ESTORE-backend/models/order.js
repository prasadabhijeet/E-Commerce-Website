
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('../models/address');
const PaymentSchema = require('../models/payment');
const CouponSchema = require('../models/coupon');
const Status = Object.freeze({
    PENDING: 'Pending',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELED: 'Canceled'
});

const orderSchema = new Schema({
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    subTotalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.PENDING
    },
    products: [{type: Object, required: true}],
    billingAddress: AddressSchema,
    shippingAddress: AddressSchema,
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    coupon: CouponSchema,
    payment: PaymentSchema,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

Object.assign(orderSchema.statics, {
    Status
});

module.exports = mongoose.model('Order', orderSchema);
