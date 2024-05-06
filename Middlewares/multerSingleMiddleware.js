const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const multerSingleConfig = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './companyLogos');
    },
    filename: (req, file, cb) => {
      cb(null, 'companyLogo-' + uuidv4() + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 2000000 }, // 2mb in bytes
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format'), false);
    }
  }
}).single('companyLogo');

module.exports = multerSingleConfig;