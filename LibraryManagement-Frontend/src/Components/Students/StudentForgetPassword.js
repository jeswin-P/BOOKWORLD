import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../Assets/Styles/Login.css'

function StudentForgetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    axios
      .put("http://localhost:4060/password", { email, newPassword })
      .then((response) => {
        if (response.data.status === 200) {
          navigate("/Studentlogin")
          setMessage("Password reset successfully!");
          
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setMessage("user not found!");
        } else {
          setMessage("Failed to reset password.");
        }
      });
  };

  return (
    <div class="container-fluide d-flex justify-content-center align-items-center vh-100 Forget-password">
      <div class="card p-4 shadow forget-card" >
        <h3 class="text-center mb-4 fw-bold">Forgot Password</h3>
        {message && (
          <div
            class={`alert ${
              message === "Password reset successfully!"
                ? "alert-success"
                : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label htmlFor="email" class="form-label fw-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              class="form-control forget-inputform"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div class="mb-3">
            <label htmlFor="newPassword" class="form-label fw-bold">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              class="form-control forget-inputform"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div class="mb-3">
            <label htmlFor="confirmPassword" class="form-label fw-bold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              class="form-control forget-inputform"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div class="d-grid">
            <button type="submit" class="btn resetpassword-btn">
              Reset 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForgetPassword;


