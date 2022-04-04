// Load in env variables only for dev environment
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const routes = require('./routes/routes.js')
const express = require('express');
// const { Db } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/', routes);
app.use('/callback', routes);
app.use('/async', routes);
app.use('/map', routes);
app.use('/photos', routes)
app.use(express.static('static'));

// Connect to mongodb database using mongoose
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})