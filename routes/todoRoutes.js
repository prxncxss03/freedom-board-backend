const express = require('express');
const router = express.Router();
const {createMessage,updateColor,updateInfo, getInfo, deleteInfo} = require('../controller/todoController');

const ObjectId = require('mongoose').Types.ObjectId;



router.route('/').post(createMessage).get(getInfo);
router.route('/:id').put(updateInfo).delete(deleteInfo);
router.put('/color/:id',updateColor);

module.exports = router;