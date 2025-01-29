var Review = require("../model/ReviewSchema")


const savereview =(req,res)=>{

    const {role, studentid, staffid ,postid ,content,rating} = req.body;


    let data = new Review({
        role:role,
        studentid: role === "student" ? studentid : undefined,
        staffid: role === "staff" ? staffid : undefined,
        postid,
        content,
        rating
    });

    data.save()
        .then((result) => {
            res.status(200).json({
                msg: "Review added successfully",
                status: 200,
                data: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: "Failed to add review",
                status: 500,
                error: err,
            });
        });
}

const reviewlist = async (req, res) => {
    const { postid } = req.params;

    await Review.find( {postid} )
        .populate("studentid","name") 
        .populate("staffid","name")
        .then((result) => {
            res.status(200).json({
                msg: "Success",
                status: 200,
                data: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: "Failed to fetch reviews",
                status: 500,
            });
        });
};


module.exports ={savereview ,reviewlist}