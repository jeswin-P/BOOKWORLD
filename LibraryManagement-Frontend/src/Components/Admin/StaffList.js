import axios from "axios";
import React, { useEffect, useState } from "react";
import imgurl from '../../Api/Imgurl'

function StaffList() {
  const [StaffList, setStaffList] = useState([]);
   const [selectedStaff, setSelectedStaff] = useState(null);

   const Stafflist=()=>{
    axios
    .get("http://localhost:4060/stafflist")
    .then((response) => {
      console.log(response);
      setStaffList(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
   }
  useEffect(() => {
    Stafflist()
    handleViewDetails()
  }, []);

  const handleViewDetails = (staff) => {
    setSelectedStaff(staff);
  };

  const handleCloseModal = () => {
    setSelectedStaff(null);
  };

  const handlestatus = (staffid) => {
    axios.put(`http://localhost:4060/staffdeactive/${staffid}`)
        .then((response) => {
            console.log(response)
            Stafflist()
            handleViewDetails()
            
        })
        .catch((err) => {
            console.log(err)
        })
}
  return (
    <div>
      <div class="container text-center mt-5">
        <h1 class="fw-bold mb-4">Staff LIST</h1>
        <div class="container ">
          <div class="row">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">SL.NO</th>
                  <th scope="col">NAME</th>
                  <th scope="col">ID.NO</th>
                  <th scope="col">Department</th>
                  <th scope="col">info</th>
                </tr>
              </thead>
              {StaffList.map((staff, index) => {
                return (
                  <tbody>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{staff.name}</td>
                      <td>{staff.idno}</td>
                      <td>{staff.department}</td>
                      <td>
                      <div onClick={() => handleViewDetails(staff)} ><i class="ri-information-2-fill ic"></i></div>
                    </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
      {selectedStaff && (
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
                  Staff Details
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
              src={`${imgurl}${selectedStaff?.image?.originalname}`}
              alt="Profile"
              class="rounded-circle profile-img img-fluid mb-4 "
            />
                <p>
                  <strong>Name:</strong> {selectedStaff.name}
                </p>
                <p>
                  <strong>Department:</strong> {selectedStaff.department}
                </p>
                <p>
                  <strong>ID. No:</strong> {selectedStaff.idno}
                </p>
                <p>
                  <strong>Email:</strong> {selectedStaff.email}
                </p>
                <button class="btn btn-success fw-bold mb-4 text-center active-btn" onClick={() => handlestatus(selectedStaff._id)} >{selectedStaff.isactive ? "DisActive" : "Active"}</button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffList;
