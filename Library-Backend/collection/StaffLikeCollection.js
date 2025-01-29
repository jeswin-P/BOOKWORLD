var StaffLike = require("../model/StaffLikeSchema")

const StaffAddLike = (req, res) => {
    console.log(req.params.staffid, req.params.bookid);
    let data = new StaffLike({
        staffid: req.params.staffid,
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

const StaffgetLike =async (req, res) => {
    
    const {staffid} = req.params
    console.log({staffid});
    await StaffLike.find({staffid})
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


const StaffremoveLike = (req, res) => {
    const { staffid, bookid } = req.params;

    StaffLike.findOneAndDelete({ staffid, bookid })
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


module.exports = {StaffAddLike ,StaffgetLike ,StaffremoveLike}