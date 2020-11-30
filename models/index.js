const mongoose = require("mongoose");

const connectMongoose = (dbUrl) => {
  mongoose.set("debug", true);
  mongoose.Promise = global.Promise;
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => {
      return err;
    });
};

exports.connectMongoose = connectMongoose;
exports.Pet = require("./pets");
exports.Owner = require("./owner");
