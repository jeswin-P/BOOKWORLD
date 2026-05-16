import axios from "axios";
import React, { useEffect, useState } from "react";
import imgurl from '../../Api/Imgurl'

function StudentList() {
  const [StudentsList, setStudentsList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const studentlist = () => {
    axios
      .get(`${imgurl}studentlist`)
      .then((response) => {
        console.log(response);
        setStudentsList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    studentlist()
    handleViewDetails()
  }, []);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handlestatus = (studentid) => {
    axios.put(`${imgurl}deactive/${studentid}`)
      .then((response) => {
        console.log(response)
        studentlist()
        handleViewDetails()

      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <div class="container text-center mt-5">
        <h1 class="fw-bold mb-4">Student LIST</h1>
        <div class="container ">
          <div class="row">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">SL.NO</th>
                    <th scope="col">NAME</th>
                    <th scope="col">department</th>
                    <th scope="col">reg.no</th>
                    <th scope="col">info</th>
                  </tr>
                </thead>
                {StudentsList.map((data, index) => {
                  return (
                    <tbody>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td class="fw-bold">{data.name}</td>
                        <td class="fw-semibold">{data.department}</td>
                        <td class="fw-semibold">{data.regno}</td>
                        <td>
                          <div onClick={() => handleViewDetails(data)} ><i class="ri-information-2-fill"></i></div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
      {selectedStudent && (
        <div
          class="modal fade show d-block "
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div class="modal-dialog " role="document">
            <div class="modal-content profiledetails-popup">
              <div class="modal-header profileheader-popup ">
                <h5 class="modal-title" id="studentDetailsModal">
                  Student Details
                </h5>
                <button
                  type="button"
                  class="btn-close close"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body text-center fw-semibold">
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
                  <strong>Reg. No:</strong> {selectedStudent.regno}
                </p>
                <p>
                  <strong>Email:</strong> {selectedStudent.email}
                </p>
                <button class="btn btn-success mb-4 fw-bold active-btn" onClick={() => handlestatus(selectedStudent._id)} >{selectedStudent.isactive ? "Active" : "Disactive"}</button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;
