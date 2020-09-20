const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://srodenas:2RdL2SrXXdNk0zak@users.f1hk5.mongodb.net/users-api-address', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false 
})

.then(db => console.log('DataBase connected'))
.catch(err => console.error(err));