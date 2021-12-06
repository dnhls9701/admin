const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
    username: {
        type : String,
        require : true
    },
    adminname:{
        type: String
    },
    number:{
        type:String
    }
})

mongoose.model('admins',adminSchema,'admins');