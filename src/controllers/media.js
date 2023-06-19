const storage = require('../utils/storage')

module.exports = {
    storageSingle: (req, res) => {
            const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        
            return res.status(200).json({
                status: true,
                message: 'success!',
                data: {
                    image_url: imageUrl
                }
            });
    },

    storageArray: (req, res) => {
            const imageUrls = [];
            req.files.forEach(file => {
                imageUrls.push(`${req.protocol}://${req.get('host')}/images/${file.filename}`);
            });
            return res.status(200).json({
                status: true,
                message: 'success!',
                data: {
                    image_urls: imageUrls
                }
            });
    }
}

