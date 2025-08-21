import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Winner = () => {
  const { listWinner } = useSelector((state) => state.dataSlice);
  return (
    <div className="body">
      <div id="winner">
        <div className="left">
          <main id="main">
            <h1>Bách hóa Hân Hân</h1>
            <p>
              Giao hàng tận nơi, tiện lợi và an toàn{" "}
              <NavLink to={"/quay-thuong"}>😄</NavLink>
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
              <NavLink to={"/"}>🏠 Trang chủ</NavLink>
            </button>
          </main>
        </div>
        <div className="content">
          <h2>KHÁCH HÀNG TRÚNG THƯỜNG</h2>
          <table>
            <thead>
              <tr>
                <td>Ngày</td>
                <td>Tên Khách Hàng</td>
              </tr>
            </thead>
            <tbody>
              {listWinner?.map((item, index) => {
                const { ngay, ten } = item;
                return (
                  <tr key={index}>
                    <td>{ngay}</td>
                    <td>{ten}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Winner;
