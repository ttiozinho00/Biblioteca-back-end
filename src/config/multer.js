const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    // @ts-ignore
                    cb(err);
                }
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            });
        },
    }),

    limits: {
        fileSize: 3 * 1024 * 1024 * 1024,
    },

    fieldsFilter: (req, file, cb) => {
        const allowedMines = [' '];
            
        if(allowedMines.includes(file.mimetype)) {
            cb(null, true);
        }

        else
        {
            cb(new Error('Invalid file type.'));
        }
    },

};