//create a schema
const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema (
    {
        text : {
            type : String,
            required : true,
        },
        author : {
            type : String,
            required : true
        },
        color: {
            type : String,
            required : false
        },
        date: { type: Date, default: Date.now }
    }
)

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;