const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/project');

const userSchema = mongoose.Schema({
name : String,
email : String,
password : String,
phoneNumber : Number,
address : String
})

module.exports = mongoose.model('user',userSchema);