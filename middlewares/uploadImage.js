const multer = require('multer')

let storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'images')
    },
    filename : (req,file,cb)=>{
        const timestamp = new Date().getTime();
        req.filename = `${timestamp}_${file.originalname}`;
        cb(null,req.filename)
    }
})

let upload = multer({storage})

module.exports = upload
