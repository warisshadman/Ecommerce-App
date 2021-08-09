const express = require('express');
const router = express.Router();
import * as BookController from '../controllers/book';
import * as UploadController from '../controllers/upload';
import * as UserController from '../controllers/user';
var multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadSingleFile = {
  storage: multer.diskStorage({
    destination: function (req, file, next) {
      let directory = (path.join(__dirname, '../public/images'));
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      next(null, directory);
    },
    filename: function (req, file, next) {
      const newName = Date.now() + file.originalname;
      next(null, newName);
    }
  }),
  fileFilter: function (req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if (image) {
      next(null, true);
    } else {
      console.log('File not supported');
      return next();
    }
  }
};

router.route('/login').post(UserController.login);
router.route('/register').post(UserController.register);
router.route('/addBook').post(BookController.addBook);

router.route('/book/:isbn').get(BookController.getBookDetailsByISBN);
router.route('/ddc-class/:code').get(BookController.getParticularDccClass);
router.route('/dcc-allclasses').get(BookController.allClassess);
router.route('/dcc-subclass-code/:id').get(BookController.getSubclassCode);
router.route('/ddc-subdivision').get(BookController.getSubDivision);
router.route('/ddc-subdivision/:unit').get(BookController.getSubDivisionCode);

router.route('/view-books').get(BookController.viewBooks);

router.route('/delete-book/:id').delete(BookController.deleteBook);


router.route('/upload-book-cover')
  .post(multer(uploadSingleFile).single('upload'), UploadController.uploadBookCoverImage);

module.exports = router;