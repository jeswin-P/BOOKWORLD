var Book=require("../model/book_schema")
var multer = require("multer")

const storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"./upload")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({ storage: storage }).single("file");

const savebook=(req,res)=>{
    let data = new Book({
        booktitle : req.body.booktitle,
        authorname : req.body.authorname,
        genre : req.body.genre,
        description : req.body.description,
        date : req.body.date,
        image: req.file
        

    })
    data.save()
    .then((result)=>{
        res.status(200).json({
            msg : "Added successfully",
            status: 200,
            data : result
        })
    })
    .catch((err)=>{
        res.status(500).json({
            msg : "failed",
            status:500
        })
    })
}

const booklist=(req,res)=>{
    Book.find()
    .then((result)=>{
        res.status(200).json({
            msg:"success",
            status:200,
            data:result
        })
    })
    .catch((err)=>{
        res.status(500).json({
            msg:"failed",
            status:500
        })
    })
}


const viewbook=async(req,res)=>{
    const {id} = req.params
    await Book.findById(id)
    .then((result)=>{
        res.status(200).json({
            msg:"viewed successfully",
            status:200,
            data:result
        })
    })
    .catch((err)=>{
        res.status(500).json({
            msg:"failed",
            status:500
        })
    })
}



const removebook=(req,res)=>{
    const {id} = req.params
    Book.findByIdAndDelete(id)
    .then((result)=>{
        res.status(200).json({
            msg:"deleted successfully",
            status:200
        })
    })
    .catch((err)=>{
        res.status(500).json({
            msg:"failed",
            status:500
        })
    })
}

const bookCount = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();

        const categoryCount = await Book.aggregate([
            {
                $group: {
                    _id: "$genre", 
                    count: { $sum: 1 } 
                }
            }
        ]);

        res.status(200).json({
            totalBooks,
            categoryCount
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Error fetching book stats",
            status: 500
        });
    }
};

const similarBooks = (req, res) => {
    const { genre } = req.params; 
    Book.find({ genre })
        .limit(4) 
        .then((books) => {
            res.status(200).json({
                msg: "Fetched similar books successfully",
                status: 200,
                data: books,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                msg: "Failed to fetch similar books",
                status: 500,
            });
        });
};

const latestBooks = (req, res) => {
    Book.find()
        .sort({ date: -1 }) 
        .limit(4) 
        .then((books) => {
            res.status(200).json({
                msg: "Fetched latest books successfully",
                status: 200,
                data: books,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                msg: "Failed to fetch latest books",
                status: 500,
            });
        });
};

const Bookstatus = (req,res) =>{
    const {id} = req.params
    Book.findByIdAndUpdate(id,{bookstatus:"unavailable"},{new:true})
    .then((result)=>{
        res.status(200).json({
            msg:"status updated",
            status:200,
            data:result
        })
    })
    .catch((err)=>{
        res.status(500).json({
            msg:"failed",
            status:500
        })
    })
}

const Bookreturnstatus = (req,res) =>{
    const {id} = req.params
    Book.findByIdAndUpdate(id,{bookstatus:"pending"},{new:true})
    .then((result)=>{
        res.status(200).json({
            msg:"status updated",
            status:200,
            data:result
        })
    })
    .catch((err)=>{
        res.status(500).json({
            msg:"failed",
            status:500
        })
    })
}


module.exports={savebook,upload,booklist,removebook,viewbook,bookCount,similarBooks,latestBooks,Bookstatus,Bookreturnstatus}


