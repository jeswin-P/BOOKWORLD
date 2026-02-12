import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import imgurl from '../../Api/Imgurl'
import '../../Assets/Styles/BookMore.css'
import { useNavigate } from 'react-router-dom';

function StaffBook() {

  const [Books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate()
  useEffect(() => {
    const staffid = localStorage.getItem("staffid")
    if (staffid == null) {
      navigate("/")
    }
    axios
      .get(`${imgurl}booklist`)
      .then((response) => {
        console.log(response);
        setBooks(response.data.data);
        setFilteredBooks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCategoryChange = (category) => {
    if (category === '') {
      setFilteredBooks(Books);
    } else {
      const filtered = Books.filter((book) => book.genre.toLowerCase() === category.toLowerCase());
      setFilteredBooks(filtered);
    }
  };

  const handleSearch = (e) => {
    const Search = e.target.value.toLowerCase();
    setSearchTerm(Search);

    const filtered = Books.filter(
      (book) => {
        return book.booktitle.toLowerCase().includes(Search) ||
          book.genre.toLowerCase().includes(Search) ||
          book.author?.toLowerCase().includes(Search);
      }
    );
    setFilteredBooks(filtered);
  };
  return (
    <div>
      <div class="container-fluid category-nav more-book">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12 m-sm-auto order-1">
            <div class="dropdown ">
              <button
                class="btn btn-secondary dropdown-toggle category-button"
                type="button"
                data-bs-toggle="dropdown"
              >
                CATEGORY
              </button>
              <ul class="dropdown-menu category-menulist">
                <li>
                  <a class="dropdown-item" onClick={() => handleCategoryChange('')}>
                    ALL CATEGORY
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => handleCategoryChange('fiction')}>
                    FICTION
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => handleCategoryChange('comics')}>
                    COMICS
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => handleCategoryChange('fantasy')} >
                    FANTASY
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => handleCategoryChange('science')} >
                    SCIENCE
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => handleCategoryChange('romantic')} >
                    ROMANTIC
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 m-sm-auto  search-col order-sm-2">
            <div class="se-box">
              <input
                type="text"
                name="search"
                placeholder="search..."
                value={searchTerm}
                onChange={handleSearch}
                class="search-box"
              />
              <button class="search-button" type="buton">
                <i class="ri-search-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div class="container-fluid  Morebooks-con  ">
          <h1 class="text-center  mb-4 mt-3 ">BOOKS</h1>
          <div class="container ">
            <div class="row">
              {filteredBooks.length > 0 ?
                (filteredBooks.map((books, index) => {
                  return (

                    <div class=" col-lg-4 col-md-6 col-sm-12">
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      >
                        <div class="card book-card">
                          <img src={`${imgurl}${books?.image?.originalname}`} alt='' class="card-img-top" />
                          <div class="card-body text-center">
                            <h5 class="card-title fw-bold">{books.booktitle}</h5>

                            <p class="card-text">{books.genre}</p>
                            <a
                              href={`/Staffbookdetails/${books._id}`}
                              class="btn view-button fw-bold"
                            >
                              View Book
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                  );
                })
                ) : (
                  <div class="text-center mt-5">
                    <h3 class="text-dark fw-bold m-2">No books found !</h3>
                    <p>Try a different search term .</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StaffBook
