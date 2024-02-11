const cloudinary = require("cloudinary");
const path = require('path');
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET
})

module.exports = {
    uploads: (file, folder) => {
        return new Promise(resolve => {
            cloudinary.uploader.upload(file, (result) => {
                resolve({
                    url: result.url,
                    directory: result.public_id
                })
            }, {
                resource_type: "auto",
                folder: folder
            })
        });
    },
    formatBufferTo64: file => {
        return parser.format(path.extname(file.originalname).toString(), file.buffer);
    }
};