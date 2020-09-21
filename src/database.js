const mongoose = require('mongoose');

if(process.env.NODE_ENV === 'test')
{
    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage()
        .then(() => {
            mongoose.connect('mongodb+srv://srodenas:2RdL2SrXXdNk0zak@users.f1hk5.mongodb.net/users-api-address',
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useFindAndModify: false 
            })
            .catch(err => console.error(err));
        })
}else{
    mongoose.connect('mongodb+srv://srodenas:2RdL2SrXXdNk0zak@users.f1hk5.mongodb.net/users-api-address',
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false 
    })
    .catch(err => console.error(err));
}