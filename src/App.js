import React, { useState, useEffect } from "react";
import "./app.scss";
import * as moment from "moment";

const App = () => {
  const [listKhachHang, setListKhachHang] = useState([]);
  const [ketQua, setKetQua] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [countdown, setCountdown] = useState(null); // Đếm ngược

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
  // const parseKhachHangFromTextArea = (text) => {
  //   const lines = text.trim().split("\n");
  //   const result = [];

  //   for (const line of lines) {
  //     const parts = line.trim().split(/\s+/);
  //     const last = parts[parts.length - 1];

  //     const isPhoneNumber = /^\d{9,}$/.test(last);
  //     if (!isPhoneNumber) continue;

  //     const soDienThoai = parts.pop();
  //     const ten = capitalizeWords(parts.join(" "));

  //     if (ten && soDienThoai) {
  //       result.push({ ten, soDienThoai });
  //     }
  //   }

  //   setListKhachHang(result);
  // };
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
  };

  // ✅ Quay số ngẫu nhiên + đếm ngược
  const quaySo = () => {
    if (listKhachHang.length === 0) {
      alert("Vui lòng nhập danh sách khách hàng hợp lệ.");
      return;
    }

    setKetQua(null); // Ẩn kết quả cũ
    setCountdown(10); // Bắt đầu từ 10

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
      <h1>🎉 QUAY THƯỞNG 🎉</h1>

      <form action="">
        <textarea
          placeholder="Nhập Tên Số Điện Thoại (ví dụ: Trương Bửu Lập 0905123456)"
          value={textInput}
          onChange={handleTextareaChange}
        />
      </form>

      {listKhachHang.length > 0 && (
        <>
          {countdown !== null ? (
            <button style={{ padding: "10px 20px", fontSize: "16px" }} disabled>
              Đang quay... {countdown}
            </button>
          ) : (
            <button
              onClick={quaySo}
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              Quay số
            </button>
          )}
        </>
      )}

      {ketQua && (
        <div
          style={{
            marginTop: "20px",
            fontSize: "20px",
            color: "green",
            fontWeight: "bold",
          }}
          className="ketQua"
        >
          <p>Ngày: {moment(ky).format("DD/MM/YYYY")}</p>
          🎊 Khách hàng trúng thưởng{" "}
          <p style={{ color: "red" }}>
            {ketQua.ten}

            {ketQua.soDienThoai !== "-" && (
              <>
                -{" "}
                <a
                  href={`tel:${ketQua.soDienThoai}`}
                  title={`Gọi cho khách hàng ${ketQua.ten}`}
                  style={{ color: "red" }}
                >
                  {ketQua.soDienThoai}
                </a>
              </>
            )}
          </p>
        </div>
      )}

      {listKhachHang.length > 0 && (
        <div style={{ marginTop: "20px" }} className="content">
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
                <tr key={index}>
                  <td
                    style={{
                      border: "1px solid #009688",
                      padding: "8px",
                      color: "#009688",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      border: "1px solid #009688",
                      padding: "8px",
                      color: "#009688",
                    }}
                  >
                    {item.ten}
                  </td>
                  <td
                    style={{
                      border: "1px solid #009688",
                      padding: "8px",
                      color: "#009688",
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
