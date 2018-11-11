const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connection = mongoose.connect(url);

connection.then((db) => {
    console.log('Connected to Server');

    var newDish = Dishes({
        name: 'Testu-Pizza',
        description: 'description for test pizza'
    });

    newDish.save()
    .then((dish) => {
        console.log(dish);
        return Dishes.find({});
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