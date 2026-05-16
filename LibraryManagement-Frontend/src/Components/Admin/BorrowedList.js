import axios from 'axios';
import React, { useEffect, useState } from 'react'
import imgurl from '../../Api/Imgurl'

function BorrowedList() {
  const [Borrowed, setBorrowed] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const borrowbook = () => {
    axios.get(`${imgurl}borrowlist`)
      .then((response) => {
        console.log(response)
        setBorrowed(response.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    borrowbook()
  }, [])

  const returnbook = (studentid, bookid) => {

    console.log(bookid, "i")
    console.log(studentid, "ii")
    axios.delete(`${imgurl}returnorder/${studentid}`)
      .then((response) => {
        console.log(response)
        borrowbook()
      })
      .catch((err) => {
        console.log(err)
      })

    axios.put(`${imgurl}bookreturnstatus/${bookid}`)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setSelectedBook(null);
  };
  return (
    <div>
      <div class="container my-5">
        <h2 class="mb-4 fw-bold">Borrow Books</h2>
        {Borrowed.length === 0 ? (
          <div>No  borrowed books found.</div>
        ) : (

          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Book Title</th>
                  <th> Returnbook</th>
                </tr>
              </thead>

              <tbody>
                {Borrowed.map((e) => {
                  return (


                    <tr>
                      <td class="fw-bold" onClick={() => handleViewStudent(e?.studentid)}>{e?.studentid?.name}</td>
                      <td class="fw-bold" onClick={() => handleViewBook(e?.bookid)}>{e?.bookid?.booktitle}</td>
                      <td><button class="btn retrn-removebtn text-center fw-bold text-nowrap" onClick={() => returnbook(e?.studentid?._id, e?.bookid?._id)}>remove</button></td>
                    </tr>



                  )

                })}
              </tbody>

            </table>
          </div>

        )}
      </div>

      {selectedStudent && (
        <div
          class="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content profiledetails-popup">
              <div class="modal-header profileheader-popup">
                <h5 class="modal-title" id="studentModal">
                  Student Details
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div class="modal-body text-center fw-semibold">
                <img
                  src={`${imgurl}${selectedStudent?.image?.originalname}`}
                  alt="Profile"
                  class="rounded-circle profile-img img-fluid mb-4 "
                />
                <p>
                  <strong>Name:</strong> {selectedStudent.name}
                </p>
                <p>
                  <strong>Department:</strong> {selectedStudent.department}
                </p>
                <p>
                  <strong>Email:</strong> {selectedStudent.email}
                </p>
                <p>
                  <strong>Reg.No:</strong> {selectedStudent.regno}
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Book Modal */}
      {selectedBook && (
        <div
          class="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="bookModal"
          aria-hidden="true"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content profiledetails-popup">
              <div class="modal-header profileheader-popup">
                <h5 class="modal-title" id="bookModal">
                  Book Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div class="modal-body text-center fw-semibold">
                <img
                  src={`${imgurl}${selectedBook?.image?.originalname}`}
                  alt={selectedBook.booktitle}
                  class="img-fluid mb-3 remove-img"
                />
                <p>
                  <strong>Title:</strong> {selectedBook.booktitle}
                </p>
                <p>
                  <strong>Author:</strong> {selectedBook.authorname}
                </p>
                <p>
                  <strong>Genre:</strong> {selectedBook.genre}
                </p>
                <p>
                  <strong>Publisher:</strong> {selectedBook.publisher}
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BorrowedList
