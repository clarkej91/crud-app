const express = require('express')
const router = express.Router();
const Album = require('../models/albums.js');


//delete path for show page and index
router.delete('/:id', (req, res) => {
  Album.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/')
  })
})

//put route for updating
router.put('/:id', (req, res) => {
  Album.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect('/')
  })
})

//index page
router.get('/', (req, res) => {
  Album.find({}, (error, allAlbums) => {
    res.render('index.ejs', {
        albums: allAlbums
    })
  })
})
//new page
router.get('/new', (req, res) => {
  res.render('new.ejs')
})
//edit route page
router.get('/:id/edit', (req, res) => {
  Album.findById(req.params.id, (err, foundAlbum) => {
    res.render(
      'edit.ejs',
      {
        albums: foundAlbum
      }
    )
  })
})
//show page
router.get('/:id', (req, res) => {
  Album.findById(req.params.id, (error, allAlbums) => {
    res.render('show.ejs', {
      albums: allAlbums
    });
  });
});


//create route, shows data on index page
router.post('/', (req, res) => {
  Album.create(req.body, (error, createdAlbum) => {
    res.redirect('/')
  })
})

module.exports = router;
