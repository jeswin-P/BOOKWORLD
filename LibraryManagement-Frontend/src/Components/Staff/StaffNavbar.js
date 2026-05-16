import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function StaffNavbar() {
    const navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault()
        const id = localStorage.removeItem("staffid")
        navigate("/")

    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg fixed-top ">
                <div class="container-fluid">

                    <p class="  font-book ">
                        BOOKWORLD
                    </p>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <i class="ri-menu-fill"></i>
                    </button>
                    <div
                        class="offcanvas offcanvas-end"
                        tabindex="-1"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title fw-bold " >
                                BOOKWORLD
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="offcanvas-body fw-bold">
                            <ul class="navbar-nav  justify-content-center flex-grow-1 pe-2 ">
                                <li class="nav-item list">
                                    <Link to={"/Staffhome"} class="nav-link active mx-lg-2 ">
                                        HOME
                                    </Link>
                                </li>
                                <li class="nav-item list">
                                    <Link to={"/Staffpf"} class="nav-link active mx-lg-2" >
                                        PROFILE
                                    </Link>
                                </li>
                                <li class="nav-item list">
                                    <Link to={"/Staffbook"} class="nav-link list active mx-lg-2" >
                                        BOOKS
                                    </Link>
                                </li>

                            </ul>
                            <a href="/home" class="btn logout-button fw-bold  " onClick={handleLogout} >LOGOUT</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default StaffNavbar
