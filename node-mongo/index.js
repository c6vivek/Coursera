const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOperations = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (error, client) => {
    assert.equal(error, null);
    console.log('Connected to Server');

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    dbOperations.insertDocument(db, 'dishes', { name: 'Vadonut', description: 'Test' }, (result) => {
        console.log('Insert Document:\n', result.ops);

        dbOperations.findDocuments(db, 'dishes', (docs) => {
            console.log('Found Documents:\n', docs);

            dbOperations.updateDocument(db, { name: 'Vadonut' }, { description: 'Updated Test' }, 'dishes', (result) => {
                console.log('Updated Document:\n', result.result);

                dbOperations.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found Updated Documents:\n', docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped Collection: ', result);

                        client.close();
                    });
                });
            });
        });
    });

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