// routes/packages.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Package = require('./models/Package');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/package/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route to handle form submission


module.exports = router;