import React, { useEffect, useRef, useState } from "react";
import "./home.scss";

const Home = () => {
  return (
    <main id="main">
      <h1>Bách hóa Hân Hân</h1>
      <p>Phục vụ tận răng 😄</p>
      <p className="zalo-link">
        <a
          href="https://zalo.me/0919317710"
          target="_blank"
          rel="noopener noreferrer"
          className="zalo-link"
        >
          Zalo: 0919 317710
        </a>
      </p>
      <button>Đăng ký thành viên</button>
    </main>
  );
};

export default Home;
