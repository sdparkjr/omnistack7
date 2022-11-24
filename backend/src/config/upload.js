const multer = require('multer');
const paht = require('path');

module.exports = {
    storage: new multer.diskStorage({
        destination: paht.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (res, file, cb) {
            cb(null, file.originalname);
        }
    })
}