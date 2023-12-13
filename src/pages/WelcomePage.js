// WelcomePage.js, the first page users see when they visit your app.

import React, { useEffect, useState } from "react";
import "/Users/juliavister/my-react-app/src/Custom.css";

function WelcomePage({ handleNavigation }) {
  /*const [bgColor, setBgColor] = useState(''); */

  /*const bgColor = "linear-gradient(to right, #FFC2C2 , #FFD7A8)"; */

  const colorPalette = [
    "gradient-animation",
    "linear-gradient(to right, #FFC2C2 , #FFD7A8)",
    "linear-gradient(to right, #EB4174 , #FFE3E3)",
    "linear-gradient(to right, #3378FF , #9442FE)",
    "linear-gradient(to right, #1AA37A , #9DFFB3)",
    "linear-gradient(to right, #8A2EFF , #CCE0FF)",
    "linear-gradient(to right, #A0BEF8 , #B5F0F0)",
    "linear-gradient(to right, #E53935 , #E35D5B)",
    "linear-gradient(to right, #FF6C87 , #FC7246)",
    "linear-gradient(to right, #FDC639 , #FF7C60)",
    "linear-gradient(to right, #C0392B , #8E44AD)",
    "linear-gradient(to right, #20002C , #CBB4D4)",
    "linear-gradient(to right, #200122 , #GF0000)",
    "linear-gradient(to right, #4568DC , #B06AB3)",
    "linear-gradient(to right, #43C6AC , #191654)",
    "linear-gradient(to right, #42275A , #734B6D)",
    "linear-gradient(to right, #4b79a1 , #283e51)",
  ];

  /*const random_bg_color = () => {
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    setBgColor(colorPalette[randomIndex]);
  };

  useEffect(() => {
    random_bg_color();
    const interval = setInterval(random_bg_color, 5000); 
    return () => clearInterval(interval);
  }, []); */

  const handleMapButtonClick = () => {
    window.location.href = "https://protecther-93ff0.firebaseapp.com/";
  };

  useEffect(() => {
    document.body.classList.add("body-welcome");

    return () => {
      document.body.classList.remove("body-welcome");
    };
  }, []);

  return (
    <div class="welcome-container">
      <div class="welcome-content">
        <h1>Welcome to ProtectHer</h1>
        <p>
          {" "}
          This is an application only for women who ever feel unsafe wherever
          they are. With this app you can safely share your location with other
          women in the area if you feel unsafe and want someone to watch over
          you. You can also use an interactive map to see danger-zones in your
          area created by other users.
        </p>
      </div>
      <div className="welcome-buttons">
        <button
          className="custom-button"
          onClick={() => handleNavigation("login")}
        >
          Login
        </button>
        <button
          className="custom-button"
          onClick={() => handleNavigation("register")}
        >
          Register
        </button>
        <button className="custom-button" onClick={handleMapButtonClick}>
          Use Interactive Map
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
