import React, { useState, useEffect } from "react";
import "./app.scss";
import * as moment from "moment";

const App = () => {
  const [listKhachHang, setListKhachHang] = useState([]);
  const [ketQua, setKetQua] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [countdown, setCountdown] = useState(null); // Đếm ngược

  const [form, setForm] = useState(false);

  const [ky, setKy] = useState(new Date());

  // ✅ Viết hoa chữ cái đầu mỗi từ
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .filter((word) => word.trim() !== "")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  // ✅ Parse dữ liệu textarea

  const parseKhachHangFromTextArea = (text) => {
    const lines = text.trim().split("\n");
    const result = [];

    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const last = parts[parts.length - 1];

      let soDienThoai = "-";

      // Nếu phần cuối là số điện thoại (ít nhất 9 chữ số)
      if (/^\d{9,}$/.test(last)) {
        soDienThoai = parts.pop();
      }

      const ten = capitalizeWords(parts.join(" "));

      if (ten) {
        result.push({ ten, soDienThoai });
      }
    }

    setListKhachHang(result);
  };

  // ✅ Khi textarea thay đổi
  const handleTextareaChange = (e) => {
    const value = e.target.value;
    setTextInput(value);
    localStorage.setItem("textInput", value); // lưu vào localStorage
    parseKhachHangFromTextArea(value);
    setForm(true);
  };

  // ✅ Quay số ngẫu nhiên + đếm ngược
  const quaySo = () => {
    if (listKhachHang.length === 0) {
      alert("Vui lòng nhập danh sách khách hàng hợp lệ.");
      return;
    }

    setKetQua(null); // Ẩn kết quả cũ
    setCountdown(9); // Bắt đầu từ 9

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          const index = Math.floor(Math.random() * listKhachHang.length);
          setKetQua(listKhachHang[index]);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ✅ Khởi động: lấy từ localStorage
  useEffect(() => {
    const savedText = localStorage.getItem("textInput");
    if (savedText) {
      setTextInput(savedText);
      parseKhachHangFromTextArea(savedText);
    }
  }, []);

  return (
    <div style={{ textAlign: "center" }} id="container">
      <h1
        onClick={() => {
          setForm(!form);
        }}
      >
        🎉 GAS KHIÊM 🎉
      </h1>
      <h3
        onClick={() => {
          setTextInput("");
          localStorage.removeItem("textInput");
          setListKhachHang([]);
          setKetQua(null);
        }}
      >
        🎉 0919 317 710 🎉
      </h3>

      <div
        className="formWrap"
        style={{ height: form ? "220px" : textInput === "" ? "220px" : 0 }}
      >
        <form action="">
          <textarea
            placeholder="Nhập Tên Số Điện Thoại (ví dụ: Trương Bửu Lập 0905123456)"
            value={textInput}
            onChange={handleTextareaChange}
          />
        </form>
      </div>

      {listKhachHang.length > 0 && (
        <>
          {countdown !== null ? (
            <button className="quay-btn" disabled>
              <span className="spinner" />
              {countdown}
            </button>
          ) : (
            <button className="quay-btn" onClick={quaySo}>
              🎯 Quay số
            </button>
          )}
        </>
      )}

      {ketQua && (
        <div className="ketQuaWrap">
          <div className="ketQuaCard">
            <p className="ngay">📅 {moment(ky).format("DD/MM/YYYY")}</p>
            <div className="ketQuaTitle">🎊 Khách hàng trúng thưởng</div>
            <div className="ketQuaTen">
              🧑‍💼 {ketQua.ten}
              {ketQua.soDienThoai !== "-" && (
                <>
                  –{" "}
                  <a
                    href={`tel:${ketQua.soDienThoai}`}
                    title={`Gọi cho khách hàng ${ketQua.ten}`}
                    className="soDienThoai"
                  >
                    📞 {ketQua.soDienThoai}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {listKhachHang.length > 0 && (
        <div style={{ marginTop: "10px" }} className="content">
          <table
            style={{
              margin: "auto",
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #009688",
                    padding: "8px",
                    backgroundColor: "#009688",
                    color: "white",
                  }}
                >
                  #
                </th>
                <th
                  style={{
                    border: "1px solid #009688",
                    padding: "8px",
                    backgroundColor: "#009688",
                    color: "white",
                  }}
                >
                  Tên khách hàng
                </th>
                <th
                  style={{
                    border: "1px solid #009688",
                    padding: "8px",
                    backgroundColor: "#009688",
                    color: "white",
                  }}
                >
                  Số điện thoại
                </th>
              </tr>
            </thead>
            <tbody>
              {listKhachHang.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: item.ten === ketQua?.ten ? "#ff4081" : "",
                  }}
                >
                  <td
                    style={{
                      // border: "1px solid #009688",
                      padding: "10px 8px",
                      color: item.ten === ketQua?.ten ? "white" : "#009688",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      // border: "1px solid #009688",
                      padding: "10px 8px",
                      color: item.ten === ketQua?.ten ? "white" : "#009688",
                      textAlign: "left",
                    }}
                  >
                    {item.ten}
                  </td>
                  <td
                    style={{
                      // border: "1px solid #009688",
                      padding: "10px 8px",
                      color: item.ten === ketQua?.ten ? "white" : "#009688",
                    }}
                  >
                    {item.soDienThoai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
