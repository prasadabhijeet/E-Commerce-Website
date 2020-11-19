const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Methods = Object.freeze({
    DEBIT: 'DebitCard',
    CREDIT: 'CreditCard',
    PAYPAL: 'PayPal'
});

const paymentSchema = new Schema({
    
    paymentMethod:{
        type: String,
        enum: Object.values(Methods),
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Done'
    },
    date: {
        type: Date
    }

});

Object.assign(paymentSchema.statics, {
    Methods
});

module.exports = paymentSchema;