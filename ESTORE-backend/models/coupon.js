const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    code: {
        type: String
    },
    description: {
        type: String
    },
    percentage: {
        type: Number,
        default: 0.1
    },
    expiryDate: {
        type: Date
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});


module.exports = couponSchema;