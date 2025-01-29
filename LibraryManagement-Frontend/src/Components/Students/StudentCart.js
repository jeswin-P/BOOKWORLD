import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imgurl from '../../Api/Imgurl';


function StudentCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const studentid = localStorage.getItem("studentid");

  useEffect(() => {
    axios
      .get(`http://localhost:4060/getcart/${studentid}`)
      .then((response) => {
        setCartItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      });
  }, [studentid]);

  // Remove Item from Cart
  const handleRemoveFromCart = (bookid) => {
    axios
      .post(`http://localhost:4060/removecart/${studentid}/${bookid}`)
      .then((response) => {
        console.log("Removed from cart:", response.data);
        setCartItems(cartItems.filter((item) => item.bookid._id !== bookid));
      })
      .catch((error) => {
        console.error("Error removing from cart:", error);
      });
  };

  return (
    <div className="cart-list">
      <div className="container my-5">
        <h2 className="fw-bold mb-4">My Cart</h2>
        {loading ? (
          <p>Loading your cart...</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div class="row">
            {cartItems.map((item) => {
              return(
              <div key={item.bookid._id} class="col-md-4 mb-4  ">
                <div class="card cart-cards ">
                  <img
                    src={`${imgurl}${item.bookid?.image.originalname}`}
                    alt={item.bookid?.booktitle}
                    class="card-img-top mt-1 img-fluid cart-image"
                  />
                  <div class="card-body text-center">
                    <h5 class="card-title fw-bold">{item.bookid?.booktitle}</h5>
                    <p class="card-text fw-semibold text-muted">
                      {item.bookid?.genre}
                    </p>
                    <a
                      href={`/Studentbookdetails/${item.bookid._id}`}
                      class="btn  cartRemove-button w-100 fw-bold mb-1"
                    >
                      View Book
                    </a>
                    <button
                      class="btn cartRemove-button w-100 fw-bold"
                      onClick={() => handleRemoveFromCart(item.bookid._id)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
              )
})}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentCart
