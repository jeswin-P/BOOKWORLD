import React from "react";
import "../../Assets/Styles/Loginus.css";
import { Link } from "react-router-dom";
import mainlogin from "../../Assets/Images/mainlogin.png";
import staff from "../../Assets/Images/staff.png";
import student from "../../Assets/Images/student.png";
import admin from "../../Assets/Images/admin.png";

function Login() {
  return (
    <section class="Login-main">
      <div class="container login-con p-0 ">
        <div class="row">
          <div class="col-12 col-lg-5 col-md-6 d-none d-lg-block  m-auto">
            <img src={mainlogin} alt="" class="img-fluid p-5" />
          </div>
          <div class="col-12 col-lg-7 col-md-6 p-0  ">
            <div class="container text-center  loginus-con">
              <div class="row">
                <h1 class="mt-lg-3 mt-sm-1">LOGIN US</h1>
                <div class="col-lg-6 col-12  ad-card">
                  <Link to="/studentlogin">
                    <div class="card card-mainlogin ">
                      <img
                        src={student} alt=""
                        class=" img-fluid card-loginimg m-auto "
                      />
                      <div class="card-body">
                        <label class="card-text login-text">STUDENT</label>
                      </div>
                    </div>
                  </Link>
                </div>
                <div class="col-lg-6 col-12 ad-card">
                  <Link to="/Stafflogin">
                    <div class="card card-mainlogin ad-card">
                      <img src={staff} alt="" class="img-fluid card-loginimg" />
                      <div class="card-body">
                        <label class="card-text login-text">STAFF</label>
                      </div>
                    </div>
                  </Link>
                </div>
                <div class="col-lg-12 col-12 ad-card">
                  <Link to="/Adminlogin">
                    <div class="card card-mainlogin mb-lg-4 m-sm-5">
                      <img src={admin} alt="" class="img-fluid card-loginimg" />
                      <div class="card-body">
                        <label class="card-text login-text">ADMIN</label>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
