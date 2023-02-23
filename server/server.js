
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const newRouter = require('./router/student.router')

app.use(cors())

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Student', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('connected to database')
}).catch((err) => {
    console.log(err)
})

app.use('/student', newRouter)
app.listen(4000, () => {
    console.log('server is running on port 4000')
}) 