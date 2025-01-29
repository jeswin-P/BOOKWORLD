var StudentLike = require("../model/StudentLinkSchema")

const AddLike = (req, res) => {
    console.log(req.params.studentid, req.params.bookid);
    let data = new StudentLike({
        studentid: req.params.studentid,
        bookid: req.params.bookid,
        status: true
    });
    data
        .save()
        .then((result) => {
            res.status(200).json({
                msg: "Added to favorites successfully",
                status: 200,
                data: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: "Failed to add to favorites",
                status: 500,
            });
        });
}

const getLike = async(req, res) => {
    
    const {studentid} = req.params
    console.log({studentid});
    await StudentLike.find({studentid})
        .populate('bookid')
        .then((result) => {
            
            res.status(200).json({
                msg: "Favorites fetched successfully",
                status: 200,
                data: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: "Failed to fetch favorites",
                status: 500,
            });
        });
}


const removeLike = (req, res) => {
    const { studentid, bookid } = req.params;

    StudentLike.findOneAndDelete({ studentid, bookid })
        .then((result) => {
            if (!result) {
                return res.status(400).json({
                    msg: "Book not found in like list",
                    status: 400,
                });
            }
            res.status(200).json({
                msg: "Removed from like successfully",
                status: 200,
                data: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: "Failed to remove from like",
                status: 500,
                error: err.message,
            });
        });
};


module.exports = {AddLike ,getLike ,removeLike}