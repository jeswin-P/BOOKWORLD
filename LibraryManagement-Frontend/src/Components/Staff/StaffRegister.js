import React, { useState } from "react";
import "../../Assets/Styles/Register.css";
import stfreg from "../../Assets/Images/stfreg.png";
import profileimg from "../../Assets/Images/profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StaffRegister() {
  const [Register, setRegister] = useState({
    name: "",
    department: "",
    idno: "",
    email: "",
    password: "",
    file:null,
  });
  const [Profile, setProfile] = useState();
  const navigate=useNavigate()

  const reg = (e) => {
    setRegister({
      ...Register,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value
    });
  };
  

 

  const profileChange = (upload) => {
    const file = upload.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log(reader);

      reader.onload = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }

    
  };

  const handlefilechange=(e)=>{
    reg(e);
    profileChange(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i in Register) {
      formData.append(i, Register[i]);
    }
    console.log(formData)

    axios.post("http://localhost:4060/savestaff",formData,{
      headers:{"content-type": "multipart/form-data"}
    })
    .then((response)=>{
        alert(response.data.msg)
        navigate("/StaffLogin")
    })
    .catch((err)=>{
      console.log(err)
    })
    console.log(Register)
  };

  return (
    <section class="register">
      <div class="container text-center reg-contain">
        <div class="row">
          <div class="col-lg-5 col-md-6 col-sm-12 order-1 m-auto">
            <img src={stfreg} alt="" class="img-fluid p-5" />
          </div>
          <div class="col-lg-7 col-md-6 col-sm-12 order-sm-2">
            <form class="reg-form" onSubmit={handleSubmit}>
              <h1 class="mt-4">REGISTER FORM</h1>

              {/* profile card           */}
              <div class="mb-2">
                <label for="upload-pic">
                  <img
                    src={Profile || profileimg} alt=""
                    class="rounded-circle profile-pic"
                  />
                </label>
                <input
                  type="file"
                  id="upload-pic"
                  accept="image/*"
                  class="form-control"
                  name="file"
                  onChange={handlefilechange}
                />
              </div>
              {/* input field */}
              <div class="form-group reg-form">
                <div class="input-group ">
                  <span class="input-group-text reg-inputform">
                    <i class="ri-user-fill"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control reg-inputform"
                    name="name"
                    placeholder="Enter your Name"
                    required
                    onChange={reg}
                  />
                </div>
              </div>
              <div class="form-group reg-form ">
                <div class="input-group ">
                  <span class="input-group-text reg-inputform">
                    <i class="ri-id-card-line"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control reg-inputform"
                    name="department"
                    placeholder="Department"
                    required
                    onChange={reg}
                  />
                </div>
              </div>
              <div class="form-group reg-form ">
                <div class="input-group ">
                  <span class="input-group-text reg-inputform">
                    <i class="ri-profile-line"></i>
                  </span>
                  <input
                    type="number"
                    class="form-control reg-inputform"
                    name="idno"
                    placeholder="ID Number"
                    required
                    onChange={reg}
                  />
                </div>
              </div>
              <div class="form-group reg-form ">
                <div class="input-group ">
                  <span class="input-group-text reg-inputform">
                    <i class="ri-mail-line"></i>
                  </span>
                  <input
                    type="email"
                    class="form-control reg-inputform"
                    name="email"
                    placeholder="Enter your mail"
                    required
                    onChange={reg}
                  />
                </div>
              </div>
              <div class="form-group reg-form ">
                <div class="input-group ">
                  <span class="input-group-text reg-inputform">
                    <i class="ri-lock-password-line"></i>
                  </span>
                  <input
                    type="password"
                    class="form-control reg-inputform"
                    name="password"
                    placeholder="password***"
                    required
                    onChange={reg}
                  />
                </div>
              </div>
              <button type="submit" class="btn reg-formbtn ">
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StaffRegister;
