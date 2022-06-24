const express = require('express');
const router = express.Router();
const Todo = require('../model/todoModel');
const ObjectId = require('mongoose').Types.ObjectId;

function isValidObjectId(id){
    
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

router.post('/',async (req,res) => {
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
})


router.put('/color/:id', async (req,res) => {
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

})


router.put('/:id', async (req,res) => {
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

})



router.get('/', (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({

                success: true,
                data: todos
            }
            );
        }
    });

}) 

router.delete('/:id',async(req,res) => {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id).then(
        res.status(200).json({
            success: true,
            data: id
        })).catch(err => {
            console.log(err);
        })
})

module.exports = router;