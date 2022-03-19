const mongoose = require("mongoose");
const keys = require('./keys')

mongoose.connect(keys.mongoUri).then(()=> {
  console.log("DB Connection Successful")
}) .catch((err)=> console.log("No DB Connection"))
