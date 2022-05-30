const express = require('express');
const path = require('path');
const fs = require("fs");
const util = require('util');
const multer  = require('multer');
const request = require('request');
const router = express.Router();
const Photo = require('../models/photo');
const Post = require('../models/post');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId; // lets me turn a string into an object is, uses this as a constructor

router.get('/', (req, res) => {
  res.send('Welcome to the photo album map!');
})

router.get('/api/images/:id', async (req, res) => {
  console.log(req.params.id);
  const img = await Photo.find({id: req.params.id})

  // res.contentType(img.photo.contentType);
  // res.send(img.photo.data);
  res.contentType(img[0].photo.contentType);
  res.send(img[0].photo.data);
  });

async function getImages(req, res) {
   //console.log(req.params.id);
  //const imgs = await Photo.find({}, 'id name coordinates')
  const posts = await Post.find({}, 'title coordinates photo').populate("photo");
  //const posts = await Post.find({}, 'coordinates')

  //function createAllImagesJson() 
 // console.log(imgs.length);
  res.json(posts);
  // res.json(imgs, posts)


    // res.contentType(img.photo.contentType);
    // res.send(img.photo.data);
  //res.contentType(img[0].photo.contentType);
  //res.send(img[0].photo.data);
}

router.get('/api/images', getImages);



//Display map route
router.get('/map', (req, res) => {
  const options = {root: path.join()};
  console.log(options);
  const fileName = 'map.html'
  res.sendFile(fileName, options);
})

// router.get('/photos', (req, res) => {
//   const options = {root: path.join()};
//   res.sendFile('photo-upload.html', options)
// })

// Upload photo route

// Set Multer storage engine
const storage = multer.diskStorage({
  destination: './public/images/',
  filename: function(req,file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

//Init photo upload
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  // fileFilter: function(req, file, cb){
  //   checkFileType(file, cb);
  // }
});

// Check file type
function checkFileType(file, cb){
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //JavaScript test function to make sure expression matches input
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else{
    cb('Error: Images only');
  }
}

router.post('/photos', upload.fields([{name: 'photo'}, {name: 'longitude'}, {name: 'latitude'}]), async (req, res, next)=> {
  const url = req.protocol + '://' + req.get('host')

  function createCoordArray(lng, lat) {
    lng = req.body.longitude
  }

  let coords = [parseFloat(req.body.longitude), parseFloat(req.body.latitude)];

  let singlePhoto = req.files.photo[0];

  let photo = new Photo({
    id: uuidv4.v4(),
    name: singlePhoto.originalname,
    photoPath: url + '/public/images/' + singlePhoto.filename,
    photo: {
      data: fs.readFileSync('./public/images/' + singlePhoto.filename),
      contentType: 'image/png'    
    }
  })

  let post = new Post({
    coordinates: coords
  })

  try {
    const newPhoto = await Photo.create(photo)
    const newPost = await Post.create(post)
    const savedPost = await Post.findById(newPost._id.valueOf())
    console.log(newPhoto._id.valueOf())
    savedPost.photo = toId(newPhoto._id.valueOf()) 
    savedPost.save() 
    // const savedPost = await Post.findByIdAndUpdate(photo._id.valueOf(), {photo: toId(photo._id.valueOf())})
    res.json(savedPost)
  } catch(err){
    next(err)
  } 
  // upload(req, res, err =>{
  //   if(err)
  //   { next(err);} 
  //   else {
  //  console.log(req.file);
  //  res.send('test')
  //   }
  // })
  // const tempPath = req.file.path;
  // const targetPath = path.join(__dirname, "./public/image.png");
  // console.log(targetPath);
  // fs.rename(tempPath, targetPath, err => {
  //   if (err) return handleError(err, res);
  //   res
  //     .status(200)
  //     .contentType("text/plain")
  //     .end("File uploaded!");
  // });
})
router.get("/photos", express.static(path.join(__dirname, "./public")));

module.exports = router