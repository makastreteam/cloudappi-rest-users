const mongoose = require('mongoose');
const {Schema} = mongoose

const AddressSchema = new Schema({
    street: {type: String, required: false},
    state: {type: String, required: false},
    city: {type: String, required: false},
    country: {type: String, required: false},
    zip: {type: String, required: false}
});

module.exports = mongoose.model('Address', AddressSchema);
