const mongoose = require('mongoose')

const Feel = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    feel: { type:String, trim:true, default:''},
    emoji: { type:String, trim:true, default:''} 
})

module.exports = mongoose.model('feelings', Feel)