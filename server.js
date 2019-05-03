const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Album = require('./models/albums.js');


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))


//delete path for show page and index
app.delete('/:id', (req, res) => {
  Album.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/')
  })
})

//put route for updating
app.put('/:id', (req, res) => {
  Album.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect('/')
  })
})

//index page
app.get('/', (req, res) => {
  Album.find({}, (error, allAlbums) => {
    res.render('index.ejs', {
        albums: allAlbums
    })
  })
})
//new page
app.get('/new', (req, res) => {
  res.render('new.ejs')
})
//show page
app.get('/:id', (req, res) => {
  Album.findById(req.params.id, (error, allAlbums) => {
    res.render('show.ejs', {
      albums: allAlbums
    })
  })
})

//edit route page
app.get('/:id/edit', (req, res) => {
  Album.findById(req.params.id, (err, foundAlbum) => {
    res.render(
      'edit.ejs',
      {
        albums: foundAlbum
      }
    )
  })
})

//create route, shows data on index page
app.post('/', (req, res) => {
  Album.create(req.body, (error, createdAlbum) => {
    res.redirect('/')
  })
})

app.listen(3000, () => {
  console.log('listening');
})
mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser:true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
