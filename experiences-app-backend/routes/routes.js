const express = require('express');
const path = require('path');
const fs = require("fs");
const util = require('util');
const multer  = require('multer')
const request = require('request');
const router = express.Router()
const Photo = require('../models/photo')

router.get('/', (req, res) => {
  res.send('Welcome to the photo album map!');
})



// Using callbacks
router.get('/callback', (req, res) => {
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?limit=1&access_token=pk.eyJ1IjoibWVnYW4tbHVpc2EiLCJhIjoiY2t2bGRocTBqYzJlbTJ2dDlidW1ycjk3eSJ9.Fd49RGr42afMbItMs5bfkg'
    request(url, (err, response, body)=> {  
      res.send(response);     
      console.log('request done');
    });   
    
})

// Using async await
const requestPromise = util.promisify(request);

router.get('/async', async (req, res) => {
  let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?limit=1&access_token=pk.eyJ1IjoibWVnYW4tbHVpc2EiLCJhIjoiY2t2bGRocTBqYzJlbTJ2dDlidW1ycjk3eSJ9.Fd49RGr42afMbItMs5bfkg'
  let resource = await requestPromise(url)
  //console.log(resource);
  res.send(resource); 
  console.log('geocode req done')
})

//Display map route
router.get('/map', (req, res) => {
  const options = {root: path.join()};
  console.log(options);
  const fileName = 'map.html'
  res.sendFile(fileName, options);
})

router.get('/photos', (req, res) => {
  const options = {root: path.join()};
  res.sendFile('photo-upload.html', options)
})

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
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('photo')

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

router.post('/photos', upload, async (req, res, next)=> {
  console.log(req.file);
  let photo = new Photo({
    photoPath: req.file.path
  })

  try {
    photo = await photo.save();
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