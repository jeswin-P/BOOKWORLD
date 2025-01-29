import React, { useState } from "react";
import "../../Assets/Styles/Login.css";
import img from "../../Assets/Images/stdlogin.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function StudentLogin() {
  const [Student, setStudent] = useState({ email: "", password: "" });

  const login = (login) => {
    setStudent({ ...Student, [login.target.name]: login.target.value });
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4060/loginstudent", Student)
      .then((response) => {
        if (response.data.msg == "login successfully" && response.data.data.isactive == true) {
          console.log(response)
          localStorage.setItem("studentid", response.data.data._id)
          navigate("/Studenthome")
        } else {
          
          if(response.data.msg == "login successfully"){
          alert("your account is deactivated by admin please contact admin")
          }
          else{
            alert(response.data.msg)
          }
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
    console.log(Student);
  };

  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate("/StudentForget");
  };

  return (
    <section class="userLogin">
      <div class="container text-center user-con">
        <div class="row">
          <div class="col-lg-5 col-md-6 col-sm-12 p-4 order-1 m-auto">
            <img src={img} alt="" class="img-fluid p-3 " />
          </div>
          <div class="col-lg-7 col-md-6 col-sm-12  p-0 order-sm-2">
            <form class="mt-5" onSubmit={handleStudentLogin}>
              <h1 class="mb-5 user-h1">STUDENT LOGIN</h1>
              <div class="form-group user-form ">
                <div class="input-group mb-3 ">
                  <span class="input-group-text user-email">
                    <i class="ri-mail-line"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control user-email"
                    name="email"
                    onChange={login}
                    placeholder="EMAIL"
                    required
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
                      onChange={login}
                      placeholder="PASSWORD"
                      required
                    />
                  </div>
                </div>

                <p class="user-forget" onClick={handleForgotPassword}>
                  forget password?
                </p>
              </div>
              <button type="submit" class="btn user-loginbtn">
                <i class="ri-lock-unlock-line"></i>
                LOGIN
              </button>
              <p>
                don't have a account ?{" "}
                <Link to={"/studentreg"}>Register now </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentLogin;
