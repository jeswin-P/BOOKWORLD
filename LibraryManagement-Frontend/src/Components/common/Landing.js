import React, { useEffect, useState } from "react";
import "../../Assets/Styles/Landing.css";
import home from "../../Assets/Images/home.png";
import { easeInOut, motion, AnimatePresence } from "framer-motion";
import ABOUTUS from "../../Assets/Images/about us.jpg";
import author1 from "../../Assets/Images/author1.jpg";
import author2 from "../../Assets/Images/author2.jpg";
import author3 from "../../Assets/Images/author3.jpg";
import author4 from "../../Assets/Images/author4.jpg";
import author5 from "../../Assets/Images/author5.webp";
import img0 from "../../Assets/Images/aboutbook1.png";
import img1 from "../../Assets/Images/ab2.png";
import img3 from "../../Assets/Images/ab3.png";
import img4 from "../../Assets/Images/ab4.png";
import img5 from "../../Assets/Images/aboutbook4.png";
import axios from "axios";
import Login from "./Login";
import imgurl from '../../Api/Imgurl'

function Landing() {
  const [Book, setBook] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [loginVisible, setloginVisible] = useState(false);
  const [Index, setIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:4060/booklist")
      .then((response) => {
        console.log(response);
        setBook(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const displayBook = Book.slice(0, 12);

  const handleShowMessage = () => {
    setShowMessage(true);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const handleloginOpen = () => {
    setloginVisible(true)
  };
  const handleloginClose = () =>{ 
    setloginVisible(false)
  };

  

  const quotes = [
    {
      author: "C.S. Lewis",
      image: author1,
      quote: "“We are what we believe we are.”",
      book: "The Chronicles of Narnia",
    },
    {
      author: "J.K. Rowling",
      image: author2,
      quote:
        "“Words are, in my not-so-humble opinion, our most inexhaustible source of magic.”",
      book: "Harry Potter Series",
    },
    {
      author: "J.R.R. Tolkien",
      image: author3,
      quote: "“Even the smallest person can change the course of the future.”",
      book: "The Lord of the Rings",
    },
    {
      author: "F. Scott Fitzgerald",
      image: author4,
      quote:
        "“Gatsby believed in the green light, the orgastic future that year by year recedes before us.”",
      book: "The Great Gatsby",
    },
    {
      author: "Mark Twain",
      image: author5,
      quote:
        "“The man who does not read has no advantage over the man who cannot read.”",
      book: "Adventures of Huckleberry Finn",
    },
  ];

  const genres = [
    {
      name: "Fantasy",
      image: img0,
      description:
        "Fantasy books open the doors to magical realms filled with mythical creatures, heroic quests, and extraordinary powers. These stories often involve conflicts between good and evil, and they transport readers to worlds beyond their wildest dreams.",
    },
    {
      name: "Science Fiction",
      image: img1,
      description:
        " Science fiction, or sci-fi, is a genre that explores speculative concepts rooted in scientific principles, technological advancements, and the possibilities of the future. It often delves into futuristic settings, advanced technologies, space exploration, time travel, alien life, and the impact of science on society and individuals.",
    },
    {
      name: "horror",
      image: img3,
      description:
        "The Horror genre is designed to evoke fear, dread, and suspense in its audience, often exploring the darker aspects of human nature and the unknown. It delves into themes like death, the supernatural, psychological torment, and monstrous creatures, creating a sense of unease and tension.",
    },
    {
      name: "Mystery and Thriller",
      image: img5,
      description:
        "Mystery and thriller books are centered around suspenseful stories that keep readers guessing. They often involve solving crimes, uncovering secrets, or navigating dangerous situations, with plot twists and cliffhangers adding to the excitement.",
    },
    {
      name: "romance",
      image: img4,
      description:
        "Romance novels focus on love and relationships, showcasing emotional connections, personal growth, and the pursuit of happiness. They often include heartfelt moments, challenges, and happy endings, making them comforting and enjoyable reads.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % genres.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleGenreClick = (index) => {
    setIndex(index);
  };

  return (
    <div class="LandingPage ">
      {/* Navbar */}
      <div>
        <nav class="navbar navbar-expand-lg fixed-top lan-nav ">
          <div class="container-fluid">
            <p class="lan-book">BOOKWORLD</p>
            <button
              class="navbar-toggler "
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
                <h5 class="offcanvas-title ">BOOKWORLD</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body  ">
                <ul class="navbar-nav justify-content-center flex-grow-1 pe-2"></ul>

                <a
                  class="btn login-register fw-bold "
                  onClick={handleloginOpen}
                >
                  Login / Register
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Landing page */}

      <section class="landing ">
        <div class="container-fluid mt-3">
          <div class="row">
            <div class="col-lg-7 col-md-7 col-12 py-lg-5 p-4 mt-lg-4 order-1">
              <h1 class="display-1 lan-anime pt-5">BOOKWORLD</h1>
              <p class="my-lg-5 my-sm-3  lan-anime text-justify w-75 pe-4 ">
                " Reading gives us someplace to go when we have to stay where we
                are, as turning pages and discovering new worlds allow us to get
                lost in the story and find ourselves within it. "
              </p>
              <div class="">
                <button
                  class="btn lan-more lan-anime mb-3"
                  onClick={handleShowMessage}
                >
                  explore more
                </button>
              </div>
            </div>
            <div class="col-lg-5 col-md-5 col-12 my-sm-1  mt-1 p-lg-4 p-5 order-sm-2">
              <motion.img
                src={home}
                class="img-fluid ab-img"
                initial={{ opacity: 0, x: "6%" }}
                whileInView={{ opacity: 1, y: 0, x: "-1%" }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* about */}

      <section id="About">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-12 p-lg-4 p-5">
              <motion.img
                src={ABOUTUS}
                class="img-fluid ab-img"
                initial={{ opacity: 0, x: "-7%" }}
                whileInView={{ opacity: 1, x: "3%" }}
                transition={{ duration: 1.5 }}
              />
            </div>
            <div class="col-lg-6 col-md-6 col-12  p-2">
              <h1 class="text-justify mx-5 mb-4  lead">ABOUT US</h1>
              <motion.p
                class="style-p my-3"
                initial={{ opacity: 0, x: "5%" }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
              >
                Welcome to BOOKWORLD, your digital gateway to a world of
                knowledge and imagination. Our mission is to provide a diverse
                and extensive collection of e-books that cater to every reader's
                interest and curiosity At BOOKWORLD, we believe that access to
                literature and information should be limitless. Our online
                library offers a wide array of books across various genres,
                ensuring that there's something for everyone We are dedicated to
                fostering a love for reading and lifelong learning by offering a
                vast selection of digital books. Our e-library is designed to
                make reading convenient and enjoyable, anytime and anywhere
                Discover a new chapter in your reading journey with BOOKWORLD.
                Our digital collection is constantly expanding, featuring both
                timeless classics and contemporary works to enrich your literary
                experience. At BOOKWORLD, we strive to make knowledge accessible
                to all. Our e-library provides a user-friendly platform where
                you can explore and enjoy a treasure trove of books, enhancing
                your personal and professional growth.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* author */}

      <div class="container-fluid ">
        <h2 class="fw-bold text-center mb-4 mt-3">
          Authors Say About Their Books
        </h2>
        <div
          id="authorQuotesCarousel"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            {quotes.map((item, index) => (
              <div
                class={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <div class="text-center">
                  <img
                    src={item.image}
                    alt={item.author}
                    className="rounded-circle mb-3 shadow img-fluid"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <blockquote class="blockquote">
                    <p class="fs-4">“{item.quote}”</p>
                  </blockquote>
                  <p class="blockquote-footer mt-2">
                    {item.author} <cite title={item.book}>- {item.book}</cite>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#authorQuotesCarousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#authorQuotesCarousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      {/* about books */}
      <section id="AboutBook">
        <div class="container ">
          <div class="text-center">
            <h1 class="fw-bold ">Top Genre Collection</h1>
            <p class="text-muted">
              Discover the most exciting genres of books for every reader.
            </p>
          </div>
          <div class="row align-items-center">
            <div class="col-md-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={genres[Index].name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 class="fw-bold text-center">{genres[Index].name}</h2>
                  <p class="">{genres[Index].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div class="col-md-6 text-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={genres[Index].image}
                  src={genres[Index].image}
                  alt={genres[Index].name}
                  class="img-fluid p-4"
                  style={{ maxHeight: "400px", objectFit: "fit" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>
            </div>
          </div>
          <div class="d-flex small-img justify-content-center">
            {genres.map((genre, index) => (
              <motion.div
                class="img-fluid"
                key={genre.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="m-2 "
                style={{ cursor: "pointer" }}
                onClick={() => handleGenreClick(index)}
              >
                <img
                  src={genre.image}
                  alt={genre.name}
                  class={`rounded-circle img-fluid border ${Index === index ? "border-dark" : "border-light"
                    }`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* collections */}

      <div class="container-fluid landing-book ">
        <motion.h1
          class="text-center py-3 fw-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2.5, easy: easeInOut }}
        >
          Discover Our Collections
        </motion.h1>
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
                        <a
                          class="btn view-button fw-bold"
                          onClick={handleShowMessage}
                        >
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

        <div class="text-center d-flex justify-content-center  mb-5">

          <button type="button" class="btn land-more p-3" onClick={handleShowMessage}>EXPLORE MORE</button>
        </div>
      </div>

      {/* alert */}
      {showMessage && (
        <div class="message-overlay">
          <div class="message-box">
            <h4>Please Login or Register</h4>
            <p>To continue, you need to log in or register an account.</p>
            <button class="btn btn-dark" onClick={handleCloseMessage}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* login */}

      {loginVisible && (
        <div class="login-overlay " onClick={handleloginClose}>
          <div class="login-content">
            <button class="close-button" onClick={handleloginClose}>
              &times;
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
