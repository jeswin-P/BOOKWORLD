var Staff=require("../model/staff_schema")
var multer=require("multer")

const storage=multer.diskStorage({
    destination:function (req,res,cb){
        cb(null,"./upload")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    },
})
const upload=multer({storage:storage}).single("file")


const savestaff=async(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    let data = new Staff({
        name : req.body.name,
        department : req.body.department,
        idno : req.body.idno,
        email : req.body.email,
        password : req.body.password,
        image : req.file,
        isactive:true
    })
    await data.save()
    .then((result)=>{
        res.status(200).json({
            msg : "registered successfully",
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

const staff_login = async (req,res)=>{
    const {email} = req.body
    const {password} = req.body
    const user = await Staff.findOne({email})

    if(!user){
        res.status(400).json({
            msg : "Email not found"
    })
}
    else{
        if(user.password != password){
            res.status(400).json({
                msg:"Incorrect password"
            })
        }
        else{
            res.status(200).json({
                msg:"Logged In Successfully",
                data:user
            })
        }
    }
}

const staffUpdate = (req, res) => {
  console.log(req.body,"kk");
  console.log(req.file,"ll");

  const { id } = req.params; 
  const { name, department, password } = req.body;

  let updateFields = {
    name,
    department,
    password,
  };

  if (req.file) {
    updateFields.image = req.file; 
  }
  Staff.findByIdAndUpdate(id, updateFields, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: "Student not found",
          status: 404,
        });
      }
      res.status(200).json({
        msg: "Update successful",
        status: 200,
        data: result,
      });
    })
    .catch((err) => {
      console.error("Error updating staff profile:", err);
      res.status(500).json({
        msg: "Update failed",
        status: 500,
      });
    });
};

const stafflist=(req,res)=>{
    Staff.find()
    .then((result)=>{
        res.status(200).json({
            msg:"success",
            data : result
        })
    })
    .catch((err)=>{
        res.status(500).json({
            msg:"failed",
            status : 500
        })
    })
}

const Staffprofile=async(req,res)=>{
  const {id}=req.params
  await Staff.findById(id)
  .then((result)=>{
      res.status(200).json({
          msg:"sucess",
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

const staffForgetPassword = (req, res) => {
  const { email, newPassword } = req.body;

  Staff.findOne({ email })
    .then((staff) => {
      if (!staff) {
        return res.status(404).json({
          msg: "Student not found",
          status: 404,
        });
      }
      staff.password = newPassword; 
      return staff.save();
    })
    .then(() => {
      res.status(200).json({
        msg: "Password reset successfully",
        status: 200,
      });
    })
    .catch((err) => {
      console.error("Error in password reset:", err);
      res.status(500).json({
        msg: "Failed to reset password",
        status: 500,
      });
    });
};

const ToDeactive=async(req,res)=>{
  console.log(req)
  const staffdata=await Staff.findById(req.params.id)
  const updatedvalue=!staffdata.isactive
  await Staff.findByIdAndUpdate(req.params.id,{isactive:updatedvalue},{new:true})
  .then((result)=>{
      console.log(result)
      res.status(200).json({
          msg:"update successfull",
          status:200,
          data: result
      })
  })
  .catch((err)=>{
      res.status(500).json({
          msg:"failed",
          status:500
      })
  })
}

module.exports={savestaff,upload,staff_login,stafflist ,Staffprofile ,staffForgetPassword,staffUpdate,ToDeactive}