const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');
const Address = require('../models/Address');

// Get all users
router.get('/getUsers', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Get user by id
router.get('/getUserById/:id', async (req, res) => { 
    if (!validateObjectId(req.params.id)) {
        res.statusMessage = "Invalid user id";
        res.status(400).end();
        return;
    } 

    const user = await User.findById(req.params.id);
    
    if(!user){
        setResponseError(res, "User not found", 404);
        res.end();
    }else{
        res.json(user);
    }
});

// Add user
router.post('/createUser', async (req, res) => {
    const {name, email, birthDate, address} = req.body;
    
    if(!name || !email || !birthDate || !address){
        setResponseError(res, "Invalid input", 405);
    }else{
        const newAddress = new Address(address);
        await newAddress.save();    

        const newUser = new User({name, email, birthDate, address: newAddress._id});
        await newUser.save();

        setResponseError(res, "Created", 201);
    }
    res.end();
});

// Update user by id
router.put('/updateUserById/:id', async (req, res) => {
    if (!validateObjectId(req.params.id)) {
        setResponseError(res, "Invalid user id", 400);
        res.end();
        return;
    }

    const {name, email, birthDate, address} = req.body;

    await User.findByIdAndUpdate(req.params.id, {name, email, birthDate}, async function (err, docs) {
        if(!docs){ 
            setResponseError(res, "User not found", 404);
        }else{
            await Address.findByIdAndUpdate(docs.address, {
                street: address.street,
                state: address.state,
                city: address.city,
                country: address.country,
                zip: address.zip
            });
        }
        res.end();
    });
});

// Delete user by id
router.delete('/deleteUserById/:id', async (req, res) => {
    if (!validateObjectId(req.params.id)) {
        setResponseError(res, "Invalid user id", 400);
        res.end();
        return;
    }

    await User.findByIdAndDelete(req.params.id, async function (err, docs) { 
        if(!docs){ 
            setResponseError(res, "User not found", 404);
        }else{
            await Address.findByIdAndDelete(docs.address);
        }
        res.end();
    });
});

// Set response code error and message
function setResponseError(res, message, code){
    res.statusMessage = message;
    res.status(code);
}

// Validate request object id
function validateObjectId(id){
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = router;