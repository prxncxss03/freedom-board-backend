const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path : './.env'})
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const { default: mongoose } = require('mongoose');

app.use(express.json());

const PORT = process.env.PORT || 3001;


let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST, DELETE,OPTIONS",
    
}

app.use(cors(corsOptions));
// app.use(function (req, res, next) {

//     res.setHeader('Access-Control-Allow-Origin', 'https://prxncxss03.github.io');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     next();
// });
app.use('/api', todoRoutes);


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