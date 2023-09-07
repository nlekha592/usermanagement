const express = require('express');
const router = express.Router();
const Controller = require('../controller/adminController');
const multer=require('multer');
const upload = require('multer')({
    storage: multer.diskStorage({ destination: './uploads', filename: (req, file, cb) => cb(null, file.originalname) }),
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/jpg'];
      allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type. Only JPEG, PNG, PDF, and JPG are allowed.'), false);
    }
  });
  
router.post('/login',Controller.login);
router.get('/users', Controller.find);
router.put('/update-user/:id',Controller.UpdateUser);
router.get('/users/:email',Controller.findByEmail)
module.exports=router;