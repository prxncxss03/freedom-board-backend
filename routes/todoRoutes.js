const express = require('express');
const router = express.Router();
const {createMessage,updateColor,updateInfo, getInfo, deleteInfo} = require('../controller/todoController');

const ObjectId = require('mongoose').Types.ObjectId;

function isValidObjectId(id){
    
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

router.route('/').post(createMessage).get(getInfo);
router.route('/:id').put(updateInfo).delete(deleteInfo);
router.put('/color/:id',updateColor);

module.exports = router;