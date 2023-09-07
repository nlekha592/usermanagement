const express=require('express');
const route=express.Router();
const controller=require("../controller/userController")
const multer=require('multer');


route.get('/',function(req,res){
    res.render('index');
})
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    console.log('Original filename:', file.originalname);
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;

  
 //API connection

 route.post("/users",upload.single('resume'),controller.create);
 route.post('/userLogin',controller.userLogin);
 
 module.exports = route;
 







