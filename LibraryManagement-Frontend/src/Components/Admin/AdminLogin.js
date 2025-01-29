import React, { useState } from "react";
import "../../Assets/Styles/Login.css";
import Adimg from "../../Assets/Images/adlogin.png";
import { useNavigate } from "react-router-dom";


function AdminLogin() {
  const [Admin, setAdmin] = useState({ email: "", password: "" });
   let email="admin@gmail.com"
  let pass="123"
  const navigate=useNavigate()
  const login = (login) => {
    setAdmin({ ...Admin, [login.target.name]: login.target.value });
  };
  const handleSubmit=(e)=>{
    e.preventDefault()
      if(email==Admin.email && pass==Admin.password)
      {
        localStorage.setItem("adminid",email)
      navigate("/adminhome")
      }
      else{
        alert("Incorrect Credentials")
      }
  
    console.log(Admin)
    
  }
  console.log(Admin);

  return (
    <section class="userLogin">
      <div class="container text-center user-con">
        <div class="row">
          <div class="col-lg-5 col-md-6 col-sm-12 p-4 order-1">
            <img src={Adimg} class="img-fluid p-5 user-img" />
          </div>
          <div class="col-lg-7 col-md-6 col-sm-12  p-0 order-sm-2">
            <form class="mt-5" onSubmit={handleSubmit}>
              <h1 class="mb-5 user-h1">ADMIN LOGIN</h1>
              <div class="form-group user-form ">
                <div class="input-group mb-3 ">
                  <span class="input-group-text user-email">
                    <i class="ri-mail-line"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control user-email"
                    name="email"
                    placeholder="EMAIL"
                    required
                    onChange={login}
                  />
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-text user-password">
                      <i class="ri-shield-keyhole-line"></i>
                    </span>
                    <input
                      type="password"
                      class="form-control user-password"
                      name="password"
                      placeholder="PASSWORD"
                      required
                      onChange={login}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" class="btn user-loginbtn mt-5">
                <i class="ri-lock-unlock-line"></i>
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
