import React, { useEffect, useState } from "react";
import imgurl from '../../Api/Imgurl'
import axios from "axios";

function Mybook() {

  
  const [Borrowed,setBorrowed] = useState([])
  const id = localStorage.getItem("staffid")

  useEffect(()=>{
    axios.get(`http://localhost:4060/vieworder/${id}`)
    .then((response)=>{
      console.log(response)
      setBorrowed(response.data.data)
    })
  },[])
  return (
    <div>
      <h1 class="fw-bold m-3 text-center">my book </h1>

        <div class="container ">
          {Borrowed.map((borrow)=>{
            return(
              <div class="cardbook shadow-lg">
            <div class="row g-0">
              <div class="col-md-3 text-center p-4">
                <img
                  src={`${imgurl}${borrow?.bookid?.image?.originalname}`}
                  alt="Book Cover"
                  class="img-fluid rounded details-img shadow-sm"
                />


                
              </div>
              <div class="col-md-8 p-4 mt-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h2 class="fw-bold mb-0 title">{borrow?.bookid?.booktitle} </h2>
                  
                </div>
                <div>

                </div>
                <p class="fw-semibold">
                  <strong>AUTHOR:</strong> {borrow?.bookid?.authorname}
                </p>
                <p class="fw-semibold">
                  <strong>CATEGORY:</strong> {borrow?.bookid?.genre}
                </p>
                <p class="fw-semibold">
                  <strong>DESCRIPTION:</strong> {borrow?.bookid?.description}
                </p>
                {/* <p class="fw-semibold"><strong>STATUS:</strong> {isBorrowed == "pending" ? "Available" : "Unavailable"}</p> */}

               
              </div>
            </div>
          </div>
            )
          })}
          
        </div>


      


    </div>
  );
}

export default Mybook;
