import React from 'react'
import '../../Assets/Styles/Footer.css'
import 'remixicon/fonts/remixicon.css'

function Footer() {
  return (
    <div class="container-fluid footer page-wrapper">
      <div class="row ">
        <div class="col-lg-4  p-5 col-md-6 m-auto">
          <p class="font-book">
            BOOKWORLD
          </p>
        </div>
        <div class="col-lg-4 p-5 col-md-6 m-auto">
          <ul>

            <p>aboutus</p>
            <p>contact us</p>
            <p>books</p>

          </ul>
        </div>
        <div class="col-lg-4 p-5 col-md-6 icon ">
          <p>contactus</p>
          <i class="ri-twitter-x-line icon-foter m-2"></i>
          <i class="ri-facebook-box-fill icon-foter m-2"></i>
          <i class="ri-whatsapp-fill icon-foter m-2"></i>
        </div>
      </div>
    </div>

  )
}

export default Footer