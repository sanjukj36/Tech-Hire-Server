const multer = require('multer')

const { v4: uuidv4 } = require('uuid');
const path = require('path');


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "resumeUrl") {
            cb(null, './resume');
        } else {
            cb(null, './uploads');
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "resumeUrl") { // if uploading resume
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) { // check file type to be pdf, doc, or docx
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
    } else { // else uploading image
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) { // check file type to be png, jpeg, or jpg
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
    }
};

const multerConfig = multer({
    storage: fileStorage,
    limits: {
        fileSize: '2mb'
    },
    fileFilter: fileFilter
}).fields([
    { name: 'resumeUrl', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]);

module.exports = multerConfig;
