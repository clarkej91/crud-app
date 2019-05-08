const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override')

// const morgan = require('morgan');

//middleware
app.use( express.static( "public" ));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
// app.use(morgan('tiny'));

const albumsController = require('./controllers/albums.js')
app.use(albumsController);

app.listen(3000, () => {
  console.log('listening');
})
mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser:true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
