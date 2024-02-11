const multer = require("multer");

const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        return cb(null, true);
    } else {
        return cb({ message: 'Unsupported file format' }, false);
    }
}

const upload = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: fileFilter
})

module.exports = upload;