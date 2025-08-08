import React, { useEffect, useRef, useState } from "react";
import "./home.scss";

const Home = () => {
  return (
    <main id="main">
      <h1>Bách hóa Hân Hân</h1>
      <p>Giao hàng tận nơi, tiện lợi và an toàn 😄</p>
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
      <button>Đăng ký thành viên</button>
    </main>
  );
};

export default Home;
