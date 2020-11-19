const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    description: {type: String, required: true},
    rating: {type: Number, required: true},
    buyer: {type: String},
    approved: {type: Boolean, required: true, default: false}
});

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    reviews: [ReviewSchema]


});


module.exports = mongoose.model('Product', productSchema);
