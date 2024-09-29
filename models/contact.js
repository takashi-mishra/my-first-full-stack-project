const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/project');

const contactSchema = mongoose.Schema({
name : String,
email : String,
textArea : String,
phoneNumber : Number,
address : String
})

module.exports = mongoose.model('contact',contactSchema);