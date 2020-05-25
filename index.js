const express=require('express');
var cors = require('cors')
const app=express();
const dotenv=require('dotenv')
const mongoose=require('mongoose');

dotenv.config();
app.use(cors());
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser:true},
()=>console.log('Connected to db'))

const authRoute=require('./routes/auth');
const rankRoute=require('./routes/rank');
app.use(express.json());

app.use('/api/user',authRoute);
app.use('/api/rank',rankRoute);
app.listen(process.env.PORT,()=>console.log('Up and Running'));