// LoginPage.js, the page to login to the app.
import React, { useState } from "react";
import "/Users/juliavister/my-react-app/src/Custom.css";

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        sessionStorage.setItem('token', token);
        // Redirect or handle successful login
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div class="login-container">
      <p>Login with your ProtectHer user profile</p>
      <div className="tab-pane fade show active" id="login-form">
        <h2 className="card-title">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Login form inputs */}
          {/* Use onChange to update state for controlled inputs */}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
