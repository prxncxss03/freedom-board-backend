const express = require('express');
const Todo = require('../model/todoModel');
const cors = require('cors');

function isValidObjectId(id){
    
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}
app.use(cors())


// app.use(function (req, res, next) {

//     res.setHeader('Access-Control-Allow-Origin', 'https://prxncxss03.github.io');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     next();
// });

const createMessage = async (req,res) => {
    const { text ,author,color} = req.body;
    const newTodo = new Todo({
        text,
        author,
        color
    })
    await newTodo.save((err, todo) => {
        if (err) {
            console.log(err);
        } else {
            console.log('sucess from post')
            res.status(200).json({
                success: true,
                data: newTodo
            }
            );
        }
    })
}

const updateColor =  async (req,res) => {
    const { color} = req.body;
    const {id} = req.params;
    if (isValidObjectId(id)) {
        
        await Todo.findByIdAndUpdate(id, {color}, {new:true}).then(
            result => {
                console.log('sucess from color')
                res.status(200).json({
                    success: true,
                    data: result
                }) 
            }
        ).catch(err => {
            console.log('error from color')
            console.log(err);
        })
    } else {
        console.log('Colors Invalid ID')
    }

}
const getInfo =  (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) {
            res.send(400).json({
                succes: false,
                data: 'Bad Request'
            })
        } else {
            res.status(200).json({

                success: true,
                data: todos
            }
            );
        }
        
    });

}

const updateInfo =  async (req,res) => {
    const { text} = req.body;
    const {id} = req.params;
    await Todo.findByIdAndUpdate(id, {text}, {new:true}).then(
        result => {
            console.log('sucess');
            res.status(200).json({
                success: true,
                data: result
            }) 
        }
    ).catch(err => {
        console.log(err);
    })

}


const deleteInfo = async(req,res) => {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id).then(
        res.status(200).json({
            success: true,
            data: id
        })).catch(err => {
            console.log(err);
        })
}


module.exports = {
    createMessage,
    updateColor,
    updateInfo,
    getInfo,
    deleteInfo

}