const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    birthDate: {type: String, required: true},
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);