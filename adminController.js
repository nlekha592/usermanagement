const Admin = require("../models/adminModel");
const nodemailer = require('nodemailer');
const jwt=require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;
let transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'lekhanetteri@gmail.com',
    pass: 'rwbixmjcrzpgbbzx',
  },
});


exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const allowedAdminUsername = "admin";
    const allowedAdminPassword = "admin";

    if (username === allowedAdminUsername && password === allowedAdminPassword) {
      res.status(200).json({
        message: "Admin login successful",
        admin: {
          username: allowedAdminUsername,
        },
      });
    } else {
      res.status(401).json({
        message: "Admin login not successful.",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

//read
exports.find = async (req, res) => {
  try {
    const user = await Admin.find();
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "error occur" });
  }
};

exports.findByEmail = async (req, res) => {
  const userEmail = req.params.email; 

  try {
    const user = await Admin.findOne({ email: userEmail });

    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "An error occurred" });
  }
};


exports.UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status === "rejected"|| status === "Approved") {
      let user = await Admin.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const prevStatus = user.status; 
      user.status = status;
      await user.save();
      console.log(prevStatus);
      const { email } = user;

      
      const newToken = jwt.sign({ email, status }, jwtSecret);


      if (status === "rejected") {
        const mailOptions = {
          from: 'lekhanetteri@gmail.com',
          to: email,
          subject: 'Your Application Status Update',
          text: 'Your application has been rejected.',
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });

        return res.status(200).json({ message: 'User status updated to rejected.', newToken });

      }
        else if (status === "Approved") {
          const mailOptions = {
            from: 'lekhanetteri@gmail.com',
            to: email,
            subject: 'Your Application Status Update',
            text: 'Congratulations! Your application has been approved.',
            html:'<p>Congratulations! Your application has been approved.<a href="http://localhost:3000/userLogin">click here</a>to continue with us</p>',
           };
  
           const sendMailPromise = new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error sending email:', error);
                reject(error);
              } else {
                console.log('Email sent:', info.response);
               
                resolve();
              }
            });
          });
          await sendMailPromise; 
        return res.status(200).json({ message: 'User status updated to approved.', newToken });
      }
    } else {
      return res.status(400).json({ message: 'Invalid status provided.' });
    }
  } catch (err) {
    console.error('Error updating user status:', err);
    res.status(500).json({ message: 'Error updating user status.' });
  }
};





