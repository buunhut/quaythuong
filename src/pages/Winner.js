import React from "react";
import Home from "./Home";
import { useSelector } from "react-redux";

const Winner = () => {
  const { listWinner } = useSelector((state) => state.dataSlice);
  return (
    <div id="winner">
      <div className="left">
        <Home />
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
  );
};

export default Winner;
