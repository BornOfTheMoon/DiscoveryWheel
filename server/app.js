const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const generatorRouter = require('./generatorRouter');
const cors = require('cors');
const port = process.env.PORT || 3000;
const history = require('connect-history-api-fallback');
require('dotenv').config();


const app = express();

mongoose.connect(process.env.MONGO_URL, () => console.log("Mongo connected successfully!"))

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

app.use(express.json());
app.use(cors())
app.use(history())

app.use('/auth', authRouter)
app.use('/generator', generatorRouter)

app.use('/', express.static(path.resolve(__dirname, '../dist')));
app.get('/*',(req, res) => {
  res.sendFile(path.join(__dirname + '../dist/index.html'))
})

