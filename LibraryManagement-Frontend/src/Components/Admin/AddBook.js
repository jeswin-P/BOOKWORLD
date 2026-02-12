import React, { useState } from "react";
import "../../Assets/Styles/Addbook.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imgurl from "../../Api/Imgurl";

function AddBook() {
  const [AddBook, setAddBook] = useState({
    booktitle: "",
    authorname: "",
    genre: "",
    description: "",
    date: "",
    file: "",

  });
  const [ValideDate, setValideDate] = useState()
  const [Profile, setProfile] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddBook({
      ...AddBook,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const profileChange = (upload) => {
    const file = upload.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCoverImage = (e) => {
    profileChange(e)
    handleChange(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (let i in AddBook) {
      formdata.append(i, AddBook[i]);
    }
    if (!ValidateDate(AddBook.date)) {
      return; // Stop submission if the validation fails
    }
    axios
      .post(`${imgurl}savebook`, formdata, {
        headers: { "content-Type": "multipart/form-data" },
      })
      .then((response) => {
        alert(response.data.msg);
        navigate("/adminhome/booklist");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(AddBook);
  };

  const ValidateDate = (DateValue) => {
    const SelectedDate = new Date(DateValue)
    const TodayDate = new Date()

    if (SelectedDate > TodayDate) {
      setValideDate("Invalid date");
      return false;
    }
    setValideDate("");
    return true;
  }

  const handleReset = () => {
    setAddBook({
      booktitle: "",
      authorname: "",
      genre: "",
      description: "",
      Date: "",
      file: "",
      epubFile: "",
    });
  };

  return (
    <section class="container-fluid addbook">
      <div class="container my-5 ">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="card add-card">
              <div class="card-header text-center headercard">
                <h3 class="fw-bold mb-0">Add New Book</h3>
              </div>
              <div class="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div class="row">
                    {/* Left Side: Image Input */}
                    <div class="col-md-4 ">
                      <label for="coverimage">
                        <div class="mb-4 book-cover  ">

                          <img src={Profile} alt="upload cover image" />

                        </div>
                      </label>
                      <input
                        type="file"
                        class="form-control d-none"
                        accept="image/*"
                        id="coverimage"
                        onChange={handleCoverImage}
                        name='file'
                      />
                      <div class="mb-3">
                        <label class="form-label fw-semibold">Book Title</label>
                        <input
                          type="text"
                          class="form-control"
                          name="booktitle"
                          onChange={handleChange}
                          placeholder="Enter book title"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label fw-semibold">
                          Author Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="authorname"
                          onChange={handleChange}
                          placeholder="Enter author's name"
                          required
                        />
                      </div>
                    </div>

                    {/* Right Side: Form Fields */}
                    <div class="col-md-8">
                      <div class="mb-3">
                        <label class="form-label fw-semibold">
                          Book Description
                        </label>
                        <textarea
                          class="form-control"
                          name="description"
                          onChange={handleChange}
                          placeholder="Enter book description"
                          rows="4"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label fw-semibold">
                          Published Date
                        </label>
                        <input
                          type="date"
                          class="form-control"
                          name="date"
                          onChange={handleChange}
                          required
                        />
                        {ValideDate && (
                          <small className="text-danger bg-light">{ValideDate}</small>
                        )}
                      </div>

                      <div class="mb-3">
                        <label class="form-label fw-semibold">Genre</label>
                        <select
                          class="form-select"
                          name="genre"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose Genre</option>
                          <option value="Fiction">FICTION</option>
                          <option value="comics">COMICS</option>
                          <option value="fantasy">FANTASY</option>
                          <option value="romantic">ROMANTIC</option>
                          <option value="non-fiction">NON_FICTION</option>
                          <option value="science">SCIENCE</option>
                          <option value="Biography">BIOGRAPHY</option>
                          <option value="Mystery">MYSTERY</option>
                          <option value="Mystery">HISTORICAL</option>
                        </select>
                      </div>
                      <div class="d-flex justify-content-between mt-4">
                        <button
                          type="reset"
                          class="btn btn-outline-dark rounded-pill px-4 fw-semibold"
                          onClick={handleReset}
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          class="btn  rounded-pill px-4 add-button fw-semibold"
                        >
                          Add Book
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddBook;
