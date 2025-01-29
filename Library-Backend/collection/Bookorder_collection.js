var Stafforder = require("../model/Bookorder_schema")

const orderlist=async (req,res)=>{
    console.log(req.body)
    let data = new Stafforder({
       staffid: req.body.staffid,
       bookid: req.body.bookid 
    })
    await data.save()
    .then((result)=>{
        res.status(200).json({
            msg:"Requested",
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

const vieworder=async(req,res)=>{
    const {staffid} = req.params
        console.log({staffid});
        await Stafforder.find({staffid})
            .populate('bookid')
            .then((result) => {
                
                res.status(200).json({
                    msg: "Borrowed fetched successfully",
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



const borrowdetails=async(req,res)=>{
        await Stafforder.find()
            .populate('bookid')
            .populate('staffid')
            .then((result) => {
                
                res.status(200).json({
                    msg: "Borrowed fetched successfully",
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

const returnorder =async (req,res)=>{
    const {id} = req.params
    await Stafforder.deleteOne({staffid : id})
    .then((result)=>{
        res.status(200).json({
            msg : "Book returned",
            status : 200,
            data : result
        })
    })
    .catch((err)=>{
        res.status(500).json({
            msg : "failed",
            status : 500
        })
    })

}

module.exports = {orderlist,vieworder,borrowdetails,returnorder}