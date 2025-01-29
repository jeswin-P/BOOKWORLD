var Student = require("../model/Student_schema");
var multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");

const savestudent = (req, res) => {
  console.log(req.body);
  console.log(res.body);

  let data = new Student({
    name: req.body.name,
    department: req.body.department,
    regno: req.body.regno,
    email: req.body.email,
    password: req.body.password,
    image: req.file,
    isactive:true
  });
  console.log(data);
  data
    .save()
    .then((result) => {
      res.status(200).json({
        msg: "registered successfully",
        status: 200,
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        msg: "failed",
        status: 500,
      });
    });
};

const LoginStudent =async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  const student =await Student.findOne({ email });
  if (!student) {
    res.status(400).json({
      msg: "incorrect email",
      status: 400,
    });
  } else {
    if (student.password != password) {
      res.status(400).json({
        msg: "incorrect password",
      });
    } else {
      res.status(200).json({
        msg: "login successfully",
        data: student,
      });
    }
  }
};

const Studentprofile=async(req,res)=>{
  const {id}=req.params
  await Student.findById(id)
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
const StudentList=(req,res)=>{
    Student.find()
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
const studentUpdate = (req, res) => {
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
  Student.findByIdAndUpdate(id, updateFields, { new: true })
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
      console.error("Error updating student profile:", err);
      res.status(500).json({
        msg: "Update failed",
        status: 500,
      });
    });
};

const studentForgetPassword = (req, res) => {
  const { email, newPassword } = req.body;

  Student.findOne({ email })
    .then((student) => {
      if (!student) {
        return res.status(404).json({
          msg: "Student not found",
          status: 404,
        });
      }
      student.password = newPassword; 
      return student.save();
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
  const studentdata=await Student.findById(req.params.id)
  const updatedvalue=!studentdata.isactive
  await Student.findByIdAndUpdate(req.params.id,{isactive:updatedvalue},{new:true})
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

module.exports = { savestudent, upload, LoginStudent,Studentprofile,StudentList,studentUpdate ,studentForgetPassword ,ToDeactive};
