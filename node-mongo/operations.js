const assert = require('assert');

exports.insertDocument = (db, collection, document, callback) => {
    const coll = db.collection(collection);
    coll.insertOne(document, (error, result) => {
        assert.equal(error, null);
        console.log('Inserted document into collection\n');
        console.log(result.result.n);
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((error, documents) => {
        assert.equal(error, null);
        callback(documents);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (error, result) => {
        assert.equal(error, null);
        console.log('Removed the document', document);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.equal(err, null);
        console.log("Updated the document with ", update);
        callback(result);        
    });
};