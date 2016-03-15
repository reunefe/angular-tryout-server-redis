"use strict";

let mongo = require("mongodb");
let client = mongo.MongoClient;
let _db;

module.exports={
    connect(){
        client.connect("mongodb://localhost:27017/angular-material-tryout",(err, db) => {
            if(err){
                console.log(err);
                console.log("Error connecting to Mongo - check mongod connection");
                process.exit(1);
            }
            _db = db;
            console.log("Connected to Mongo");
        });
    },
    imageUrls(){
        return _db.collection("imageUrls");
    }
}