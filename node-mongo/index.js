const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOperations = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (error, client) => {
    assert.equal(error, null);
    console.log('Connected to Server');

    const db = client.db(dbname);
    // const collection = db.collection('dishes');

    dbOperations.insertDocument(db, { name: "Vadonut", description: "Test"}, "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dbOperations.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dbOperations.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dbOperations.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

    // collection.insertOne({name: 'Testu-PIZZA', description: 'one more'}, (error, result) => {
    //     assert.equal(error, null);
    //     console.log('Document Inserted \n');
    //     console.log(result.ops);

    //     collection.find({}).toArray((error, result) => {
    //         assert.equal(error, null);
    //         console.log('Found records');
    //         console.log(result);

    //         db.dropCollection('dishes', (error, result) => {
    //             assert.equal(error, null);
    //             client.close();
    //         });
    //     });
    // });
});