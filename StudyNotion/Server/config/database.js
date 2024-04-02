const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/StudyNotion")
    .then(() => {
      console.log("Db connected successfully");
    })
    .catch(e => {
      console.log(e);
      process.exit(1);
    });
};
