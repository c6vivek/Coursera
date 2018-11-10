const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (error, client) => {
    assert.equal(error, null);
    console.log('Connected to Server');

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({name: 'Testu-PIZZA', description: 'one more'}, (error, result) => {
        assert.equal(error, null);
        console.log('Document Inserted \n');
        console.log(result.ops);

        collection.find({}).toArray((error, result) => {
            assert.equal(error, null);
            console.log('Found records');
            console.log(result);

            db.dropCollection('dishes', (error, result) => {
                assert.equal(error, null);
                client.close();
            });
        });
    });
});