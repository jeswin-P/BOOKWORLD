import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import home from '../../Assets/Images/home.png'
import '../../Assets/Styles/Home.css'
import imgurl from '../../Api/Imgurl'
import { motion } from "framer-motion";
function StudentHome() {
  const [Book, setBook] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const studentid = localStorage.getItem("studentid")
    if (studentid == null) {
      navigate("/")
    }
    axios.get(`${imgurl}booklist`)
      .then((response) => {
        console.log(response)
        setBook(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const displayBook = Book.slice(0, 12);
  return (
    <><section class="home mt-5 mt-lg-2">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-7 col-md-7 col-12 py-lg-5 p-5 mt-4 order-1">
            <h1 class="display-1 anime ">BOOKWORLD</h1>
            <p class="my-lg-5 my-sm-3 anime">Reading gives us someplace to go when we have to stay where we are,
              as turning pages and discovering new worlds allow us to get lost in the story
              and find ourselves within it</p>
            <div class="input-group m-2">
              <Link to={'/studentbook'}><button class="btn ex-more anime anime-btn">explore more</button></Link>
            </div>
          </div>
          <div class="col-lg-5 col-md-5 col-12 my-sm-1   order-sm-2">
            <img src={home} alt="" class="img-fluid " />

          </div>
        </div>
      </div>


    </section><div class="container-fluid book-con ">
        <h1 class="text-center py-3">BOOKS</h1>
        <div class="container ">
          <div class="row ">
            <div class="container ">
              <motion.div
                class="book-row"
                animate={{
                  x: ["0%", "-100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 40,
                  ease: "linear",
                }}
              >
                {displayBook.map((Book) => {
                  return (
                    <div class=" col-lg-3 col-md-6 col-sm-12">
                      <div>
                        <div class="card land-card">
                          <img src={`${imgurl}${Book?.image?.originalname}`} class="card-img-top" />
                          <div class="card-body text-center">
                            <h5 class="card-title fw-bold">{Book.booktitle}</h5>
                            <p class="card-text">{Book.price}</p>
                            <a href={`/Studentbookdetails/${Book._id}`} class="btn view-button fw-bold">
                              View Book
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
        <div class="text-center d-flex justify-content-center mt-4">
          <Link to="/studentbook">
            <button type="button" class="btn more-books p-3 mb-3">EXPLORE MORE</button>
          </Link>
        </div>
      </div></>
  )
}

export default StudentHome
