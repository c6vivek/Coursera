const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connection = mongoose.connect(url);

connection.then((db) => {
    console.log('Connected to Server');

    Dishes.create({
        name: 'Testu-Pizza',
        description: 'description for test pizza'
    })
    .then((dish) => {
        console.log(dish);
        //return Dishes.find({}).exec();
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {
                description: 'Updated description for test pizza'
            }
        }, { new: true}).exec();
    })
    .then((dish) => {
        console.log(dish);
        dish.comments.push({
            rating: 4,
            comment: 'Hell of a good pizza',
            author: 'Gordon Ramsay'
        });
        return dish.save();
    })
    .then((dishes) => {
        console.log(dishes);
        return Dishes.remove({});
    })
    .then(() => {
        console.log('closing connection');
        return mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
    });
});