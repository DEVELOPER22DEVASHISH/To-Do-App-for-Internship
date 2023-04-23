const mongoose = require("mongoose");


const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    closed: {
        type: Boolean,
        default: false
    },
    
  
},
{ timestamps: true }

)

const todo = mongoose.model('todo', TodoSchema);

module.exports = todo;