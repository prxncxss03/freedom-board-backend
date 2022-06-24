const express = require('express');
const app = express()
const router = express.Router();
const {createMessage,updateColor,updateInfo, getInfo, deleteInfo} = require('../controller/todoController');

const ObjectId = require('mongoose').Types.ObjectId;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

router.route('/').post(createMessage).get(getInfo);
router.route('/:id').put(updateInfo).delete(deleteInfo);
router.put('/color/:id',updateColor);

module.exports = router;