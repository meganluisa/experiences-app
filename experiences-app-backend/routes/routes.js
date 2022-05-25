const express = require('express');
const path = require('path');
const fs = require("fs");
const util = require('util');
const multer  = require('multer')
const request = require('request');
const router = express.Router()
const Photo = require('../models/photo')
const { v4: uuidv4 } = require('uuid');

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
  const imgs = await Photo.find({}, 'id name coordinates')
  console.log(imgs);
  res.send(imgs);
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

router.post('/photos', upload.fields([{name: 'photo'}]), async (req, res, next)=> {
  const url = req.protocol + '://' + req.get('host')
  console.log(req.files.photo[0]);
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

  try {
    photo = await Photo.create(photo)
    res.send(photo)
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