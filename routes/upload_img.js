const express = require('express');
const multer = require('multer');
var router = express.Router();
const path = require("path");
const fs = require('fs');

const image_path = './public/images/'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

// add image
router.post('/', upload.single('uploaded_file'), function (req, res) {
  try {
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
});


// delete image
router.delete('/', function (req, res) {
  let name = req.body.name
  try {
    fs.unlinkSync(image_path + name)
    res.send("img is deleted")
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;