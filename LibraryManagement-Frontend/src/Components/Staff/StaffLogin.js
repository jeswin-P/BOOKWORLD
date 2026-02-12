import React, { useState } from "react";
import "../../Assets/Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import imgurl from "../../Api/Imgurl";
import stfimg from "../../Assets/Images/stfimg.png";
import axios from "axios";

function StaffLogin() {

  const navigate = useNavigate();

  const [Staff, setStaff] = useState({ email: "", password: "" });

  const login = (e) => {
    setStaff({ ...Staff, [e.target.name]: e.target.value });
  };

  const staffhandle = (e) => {
    e.preventDefault();
    axios
      .post(`${imgurl}stafflogin`, Staff)
      .then((response) => {
        if (response.data.msg === "Logged In Successfully" && response.data.data.isactive == true) {
          localStorage.setItem("staffid", response.data.data._id)
          alert(response.data.msg);
          navigate("/Staffhome")
        }
        else {
          alert(response.data.msg)
        }

      })
      .catch((err) => {
        alert(err.response.data.msg);
      });

  };
  console.log(Staff);


  const handleForgotPassword = () => {
    navigate("/StaffForget");
  };

  return (
    <section class="userLogin ">
      <div class="container text-center user-con">
        <div class="row">
          <div class="col-lg-5 col-md-6 p-0 col-sm-12 order-1 m-auto">
            <img src={stfimg} alt="" class="img-fluid p-5 " />
          </div>
          <div class="col-lg-7 col-md-6 col-sm-12  p-0 order-sm-2">
            <form class="mt-5 p-4 " onSubmit={staffhandle}>
              <h1 class="mb-5 user-h1">STAFF LOGIN</h1>
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
                <div class="form-group ">
                  <div class="input-group  ">
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
                <p class="user-forget" onClick={handleForgotPassword}>
                  forget password?
                </p>
              </div>
              <button type="submit" class="btn user-loginbtn ">
                <i class="ri-lock-unlock-line"></i>
                LOGIN
              </button>
              <p>
                don't have a account ?{" "}
                <Link to={"/StaffRegister"}>Register now </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StaffLogin;
