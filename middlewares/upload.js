const multer = require ('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'public/profil');
    },
    filename: (req, file, callback) =>{
        callback(null, `${req.params.id}.jpg`);
    }
});

module.exports = multer({storage: storage}).single('image');