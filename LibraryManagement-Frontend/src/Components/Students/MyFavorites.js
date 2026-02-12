import React, { useEffect, useState } from 'react'
import "../../Assets/Styles/Favorites.css"
import { motion } from 'framer-motion'
import axios from 'axios'
import imgurl from '../../Api/Imgurl'

function MyFavorites() {
  const [Favorite, setFavorite] = useState([])
  const id = localStorage.getItem("studentid")
  console.log(id, "ii")
  useEffect(() => {
    axios.get(`${imgurl}getlike/${id}`)
      .then((response) => {
        console.log(response)
        setFavorite(response.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>

      <section>
        <div class="container-fluid  Morebooks-con ">
          <h1 class="text-center py-3">Favorite</h1>
          <div class="container ">
            <div class="row">
              {Favorite.map((fav, index) => {
                return (

                  <div class=" col-lg-4 col-md-6 col-sm-12">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <div class="card book-card">
                        <img src={`${imgurl}${fav?.bookid?.image?.originalname}`} alt='' class="card-img-top" />
                        <div class="card-body text-center">
                          <h5 class="card-title fw-bold">{fav.bookid.booktitle}</h5>

                          <p class="card-text">{fav.bookid.genre}</p>

                          <a
                            href={`/Studentbookdetails/${fav.bookid._id}`}
                            class="btn view-button fw-bold"
                          >
                            View Book
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default MyFavorites