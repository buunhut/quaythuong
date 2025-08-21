import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateListWinner } from "../redux/dataSlice";
import moment from "moment";

const Winner = () => {
  const dispatch = useDispatch();
  const { listWinner } = useSelector((state) => state.dataSlice);

  const fetchListWinner = async () => {
    const result = await axios({
      url: "https://api.nodejs.edu.vn/nodejs/contact",
      method: "get",
    }).then((res) => res.data.content);

    if (result.length > 0) {
      const filterData = result.filter(
        (item) => item.yourEmail === "hhquayThuong@buulap.com"
      );

      dispatch(updateListWinner(filterData));
    }
  };
  useEffect(() => {
    fetchListWinner();
  }, []);
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
              {listWinner
                ?.slice() // copy mảng để tránh mutate
                .sort(
                  (a, b) => new Date(b.contactTime) - new Date(a.contactTime)
                ) // sắp xếp mới -> cũ
                .map((item, index) => {
                  const {
                    contactTime: ngay,
                    yourName: ten,
                    textMessage: soDt,
                  } = item;
                  return (
                    <tr key={index}>
                      <td>{moment(ngay).format("DD/MM/YYYY")}</td>
                      <td>
                        <p>{ten}</p>
                        <span>{soDt}</span>
                      </td>
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
