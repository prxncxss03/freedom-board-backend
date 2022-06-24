const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path : './.env'})
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const { default: mongoose } = require('mongoose');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use('/api', todoRoutes);
app.use('/api/color/', todoRoutes);

mongoose.connect(process.env.MONGO_URI,
    {
        //must add in order to not get any error masseges:
        useNewUrlParser: true,
        useUnifiedTopology:true,
      
    }
    ).then((result) => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
})

app.listen(PORT, () => {
    console.log(process.env.MONGO_URI)
    console.log(`Server is listening on port ${PORT}`);
})