import React, { useEffect, useState } from "react";
import "../../Assets/Styles/Profile.css";
import BorrowBooks from "./BorrowBooks";
import MyFavorites from "./MyFavorites";
import profileimg from "../../Assets/Images/profile.png";
import axios from "axios";
import imgurl from '../../Api/Imgurl'
import StudentCart from "./StudentCart";
import { useNavigate } from "react-router-dom";

function StudentProfile() {
  const [SlideisOpen, setSlideIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("MyBook");
  const [profile, setProfile] = useState({});
  const [EditPage, setEditPage] = useState(false);
  const [editData, setEditData] = useState();
  const [UserProfile, setUserProfile] = useState({})

  const toggleSidebar = () => {
    setSlideIsOpen(!SlideisOpen);
  };

const navigate=useNavigate()
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "MyBook":
        return <BorrowBooks />;
      case "Favorites":
        return <MyFavorites />;
      case "StudentCart":
        return <StudentCart />;
      default:
        return <BorrowBooks />;
    }
  };

  const profileChange = (upload) => {
    const file = upload.target.files[0];
    handleSaveprofile()
    if (file) {
      const reader = new FileReader();
      console.log(reader);

      reader.onload = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);


      const id = localStorage.getItem('studentid');
    const formData = new FormData();

    for (const key in editData) {
      formData.append(key, editData[key]);
      // formData.append("image", editData.image)
    }

    axios
      .put(`http://localhost:4060/studentupdate/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        setProfile(editData);
        setUserProfile(response.data.data);
        setEditPage(false);
        console.log('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });

    }

    setEditData({
      ...editData, [upload.target.name]:
        upload.target.name === "file" || upload.target.name === "image" ? upload.target.files[0] : upload.target.value,
    });
  };
  useEffect(() => {
    const studentid=localStorage.getItem("studentid")
    if(studentid==null){
      navigate("/")
    }
    const id = localStorage.getItem("studentid")
    console.log(id)
    axios.get(`http://localhost:4060/studentprofile/${id}`)
      .then((response) => {
        console.log(response, "ïi")
        setUserProfile(response.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const handleEditClick = () => {
    setEditData(profile);
    setEditPage(true);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData, [e.target.name]:
        e.target.name === "file" || e.target.name === "image" ? e.target.files[0] : e.target.value,
    });
  };
  console.log(editData)

  const handleSave = () => {
    setProfile(editData);
    setEditPage(false);
    handleSaveprofile()
  };
  const handleClose = () => {
    setEditPage(false);
  };

  const handleSaveprofile = () => {
    const id = localStorage.getItem('studentid');
    const formData = new FormData();
console.log(formData)
    for (const key in editData) {
      formData.append(key, editData[key]);
    }
    formData.append("file", editData.image);
  
    
    axios
      .post(`http://localhost:4060/studentupdate/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        setProfile(editData);
        setUserProfile(response.data.data);
        setEditPage(false);
        console.log('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div>
      {/* navbar */}

      <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container-fluid">
          <button className="btn  d-lg-none me-2" onClick={toggleSidebar}>
            <i class="ri-menu-line"></i>
          </button>

          <h1 class="navbar-brand  fw-bold lan-book">BOOKWORLD</h1>
          <div class="ms-auto">
            <ul class="nav d-none d-lg-flex fw-bold">
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="Studenthome"
         
                >
                 Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#myBook"
                  onClick={() => setActiveComponent("MyBook")}
                >
                  My Book
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#favorites"
                  onClick={() => setActiveComponent("Favorites")}
                >
                  Favorites
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#cart"
                  onClick={() => setActiveComponent("StudentCart")}
                >
                  Cart
                </a>
              </li>
              
            </ul>

            {/* Dropdown for small screens */}
            <ul class="nav  fw-bold   d-lg-none">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="menuDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Menu
                </a>
                <ul
                  class="dropdown-menu profile-menu  dropdown-menu-end drop-color text-dark"
                  aria-labelledby="menuDropdown"
                >
                  <li class="nav-item">
                <a
                  class="nav-link"
                  href="Studenthome"
         
                >
                 Home
                </a>
              </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#myBook"
                      onClick={() => setActiveComponent("MyBook")}
                    >
                      My Book
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item "
                      href="#favorites"
                      onClick={() => setActiveComponent("Favorites")}
                    >
                      Favorites
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item "
                      href="#cart"
                      onClick={() => setActiveComponent("StudentCart")}
                    >
                      Cart
                    </a>
                  </li>
                
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Slidebar */}
      <div
        class={`sidebar    ${SlideisOpen ? "sidebar-open" : "sidebar-closed"} `}
      >
        <button class="btn d-lg-none close-btn" onClick={toggleSidebar}>
          <i class="ri-close-large-line"></i>
        </button>
        <div class="p-2 mt-5  ">
          <div class="text-center mb-5   text-slidebar">
            <img
              src={`${imgurl}${UserProfile?.image?.originalname}`}
              alt="Profile"
              class="rounded-circle profile-img img-fluid "
            />
            <button
              class="btn edit-btn fw-bold position-absolute mt-5 fs-4 "
              style={{
                width: "60px",
                height: "60px",
              }}
              onClick={handleEditClick}
            >
              <i class="ri-edit-fill"></i>
            </button>
            <h5 class="mt-4 fw-bold ">{UserProfile.name}</h5>
            <p>{UserProfile.regno}</p>
            <p>{UserProfile.department}</p>
            <p>{UserProfile.email}</p>

          </div>
        </div>
      </div>

      {/* overlay */}
      {EditPage && (
        <div class="modal show d-block " tabIndex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content form-edit">
              <div class="modal-header edit-header">
                <h5 class="modal-title fw-bold ">Edit Profile</h5>
                <button
                  type="button"
                  class="btn-close close-edit"
                  onClick={handleClose}
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-2 text-center">
                    <label htmlFor="upload-pic">
                      <img
                        src={profile}
                        class="rounded-circle border-dark profile-pic"
                        alt="Profile Preview"
                        name="file"
                      />
                    </label>
                    <input
                      type="file"
                      id="upload-pic"
                      accept="image/*"
                      name="file"
                      class="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      value={editData.name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Department</label>
                    <input
                      type="text"
                      class="form-control"
                      name="department"
                      value={editData.department || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      value={editData.password || ""}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button class="btn btn-dark" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* main content */}
      <div class="main-content mt-5">
        <div class="p-4">{renderActiveComponent()}</div>
      </div>
    </div>
  );
}

export default StudentProfile;
