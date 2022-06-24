const express = require('express');
const app = express();
require('dotenv').config({path : '../.env'});
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const { default: mongoose } = require('mongoose');
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use('/api', todoRoutes);

mongoose.connect(process.env.DATABASE_URL,
    {
        //must add in order to not get any error masseges:
        useUnifiedTopology:true,
        useNewUrlParser: true,
        useCreateIndex: true
    }
    ).then((result) => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
})

app.listen(PORT, () => {
    console.log(process.env.DATABASE_URL)
    console.log(`Server is listening on port ${PORT}`);
})