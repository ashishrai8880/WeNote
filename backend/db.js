const mongoose = require("mongoose")

const mongooseURI = "mongodb://localhost/iNotebook";

const connectToMongo = ()=>{
    mongoose.connect(mongooseURI , ()=>{
        console.log("Connected to Database succcesfully");
    })
}

module.exports = connectToMongo ;