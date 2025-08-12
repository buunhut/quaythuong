import React, { useEffect, useRef, useState } from "react";
import "./home.scss";
import { NavLink } from "react-router-dom";

const Home = () => {
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
      <button type="button">Đăng ký thành viên</button>
    </main>
  );
};

export default Home;
