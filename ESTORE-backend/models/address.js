const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    zipCode:{
        type: String,
        required: true
    },
    streetAddress:{
        type: String
    }

});


module.exports = addressSchema;