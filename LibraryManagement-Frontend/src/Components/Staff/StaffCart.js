import axios from 'axios';
import React, { useEffect, useState } from 'react'
import imgurl from '../../Api/Imgurl';

function StaffCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const staffid = localStorage.getItem("staffid");

  useEffect(() => {
    axios
      .get(`http://localhost:4060/getcart/${staffid}`)
      .then((response) => {
        setCartItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      });
  }, [staffid]);

  // Remove Item from Cart
  const handleRemoveFromCart = (bookid) => {
    axios
      .post(`http://localhost:4060/removecart/${staffid}/${bookid}`)
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
          {cartItems.map((item) => (
            <div key={item.bookid._id} class="col-md-4 mb-4">
              <div class="card cart-cards">
                <img
                  src={`${imgurl}${item.bookid.image.originalname}`}
                  alt={item.bookid.booktitle}
                  class="card-img-top img-fluid cart-image"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{item.bookid.booktitle}</h5>
                  <p class="card-text">
                    {item.bookid.authorname}
                  </p>
                  <p class="card-text">
                  {item.bookid.genre}
                  </p>
                  <button
                    class="btn cartRemove-button w-100 fw-bold"
                    onClick={() => handleRemoveFromCart(item.bookid._id)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  )
}

export default StaffCart
