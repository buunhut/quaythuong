import React, { useEffect, useRef, useState } from "react";
import "./home.scss";
import { NavLink, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const getUserId = () => {
    let userId = localStorage.getItem("user_id");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("user_id", userId);
    }
    // console.log(userId);
  };

  getUserId();

  const path = window.location.pathname;

  return (
    <main id="main">
      <h1>Bách hóa Hân Hân</h1>
      <p>
        Giao hàng tận nơi, tiện lợi và an toàn{" "}
        <NavLink to={"quay-thuong"}>😄</NavLink>
      </p>
      <p className="zalo-link">
        <a
          href="https://zalo.me/3569852425617577963"
          target="_blank"
          rel="noopener noreferrer"
          className="zalo-link"
        >
          Zalo: 0919 317 710
        </a>
      </p>
      <div className="zalo-qr">
        <img src="./img/qrBhhh.jpg" alt="" />
      </div>
      <button type="button">
        {path === "/" ? (
          <NavLink to={"/winner"}>👀 Khách hàng trúng thưởng</NavLink>
        ) : (
          <NavLink to={"/"}>🏠 Trang chủ</NavLink>
        )}
      </button>
    </main>
  );
};

export default Home;
