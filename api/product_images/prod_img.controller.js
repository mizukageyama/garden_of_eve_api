
const cloudinary = require("../../config/cloudinary");
const { formatBufferTo64 } = require("../../config/cloudinary");

module.exports = {
    uploadProductImage: async file => {
        const uploader = async (path) => await cloudinary.uploads(path, 'Products');

        //Upload multiple images
        //const urls = [];
        // for (const file of files) {
        //     const file64 = formatBufferTo64(file);
        //     const newPath = await uploader(file64.content);
        //     urls.push(newPath);
        // }
        //return urls;

        //Upload single image
        const file64 = formatBufferTo64(file[0]);
        const newPath = await uploader(file64.content);
        return newPath
    },
    uploadProfileImage: async file => {
        const uploader = async (path) => await cloudinary.uploads(path, 'Profiles');

        //Upload single image
        const file64 = formatBufferTo64(file[0]);
        const newPath = await uploader(file64.content);
        return newPath
    }
};