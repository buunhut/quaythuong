import React, { useEffect, useState } from "react";
import * as moment from "moment";
import { NavLink } from "react-router-dom";
import axios from "axios";

const QuayThuong = () => {
  const [listKhachHang, setListKhachHang] = useState([]);
  const [ketQua, setKetQua] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [countdown, setCountdown] = useState(null); // Đếm ngược
  const [soDt, setSoDt] = useState("");
  const [hideMouse, setHideMouse] = useState(false);

  const [form, setForm] = useState(false);

  const [ky, setKy] = useState(new Date());

  const autoScrollDownThenUp = (step = 1, delay = 14) => {
    let scrollingDown = true;
    let scrollTimer;

    const scrollStep = () => {
      if (scrollingDown) {
        window.scrollBy(0, step);

        const bottomReached =
          Math.ceil(window.scrollY + window.innerHeight) >=
          document.documentElement.scrollHeight;

        if (bottomReached) {
          clearInterval(scrollTimer);
          setTimeout(() => {
            scrollingDown = false;
            scrollTimer = setInterval(scrollStep, delay);
          }, 1000); // đợi 1s rồi bắt đầu cuộn lên
        }
      } else {
        window.scrollBy(0, -step);

        const topReached = window.scrollY <= 0;

        if (topReached) {
          clearInterval(scrollTimer);
          setTimeout(() => {
            quaySo(); // gọi hàm sau khi cuộn lên xong
          }, 2000);
        }
      }
    };

    // Đảm bảo luôn bắt đầu từ trên đầu
    window.scrollTo(0, 0);

    scrollTimer = setInterval(scrollStep, delay);
  };

  // ✅ Viết hoa chữ cái đầu mỗi từ
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .filter((word) => word.trim() !== "")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  const replaceShortCodes = (text) => {
    const replacements = {
      cd: "Cây Dương",
      nmkn: "Nhà Máy Kim Nguyên",
      đ1: "Đồng 1",
      hme: "Hàng Me",
      cn: "Chệt Niêu",
      bđ: "Bưu Điện",
      bd: "Bưu Điện",
      nt: "Nhà Thờ",
      ak: "An Khoa",
      xl: "Xóm Lung",
      lt: "Láng Tròn",
      vma: "Vĩnh Mỹ A",
      vmb: "Vĩnh Mỹ B",
      // a: "Anh",
      xc: "Xóm Củi",
      lg: "Lò Gạch",
    };

    // Tạo regex bắt các từ bất kể viết hoa/thường
    const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);
    const pattern = keys
      .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const regex = new RegExp(`(^|\\s)(${pattern})(?=\\s|$)`, "gi");

    return text.replace(regex, (match, space, code) => {
      // Chuẩn hóa: "Đ" → "đ", loại dấu
      const normalizedCode = code
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace("Đ", "đ")
        .toLowerCase();

      const replacement = replacements[normalizedCode] || code;
      return `${space}${replacement}`;
    });
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
    // localStorage.setItem("textInput", value); // lưu vào localStorage
    parseKhachHangFromTextArea(value);
    setForm(true);
  };

  // ✅ Quay số ngẫu nhiên + đếm ngược
  const quaySo = () => {
    if (listKhachHang.length === 0) {
      // alert("Vui lòng nhập danh sách khách hàng hợp lệ.");
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
          setHideMouse(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ✅ Khởi động: lấy từ localStorage
  useEffect(() => {
    localStorage.removeItem("textInput");
    window.document.title = "Quay Thưởng";
  }, []);

  const postDataToBackEnd = async () => {
    if (!ketQua?.ten) return;
    const currentTime = new Date().toISOString();
    const dataPost = {
      yourName: ketQua?.ten,
      textMessage: soDt,
      contactTime: currentTime,
      yourEmail: "hhquayThuong@buulap.com",
    };
    // console.log("send to BE", dataPost);

    const result = await axios({
      url: "https://api.nodejs.edu.vn/nodejs/contact",
      method: "post",
      data: dataPost,
    }).then((res) => res.data.content);
  };

  return (
    <div style={{ cursor: hideMouse ? "none" : "" }}>
      <div style={{ textAlign: "center" }} id="container">
        <NavLink to={"/"}>
          <h1
            onClick={() => {
              setForm(!form);
            }}
          >
            🎉 Bách hóa HÂN HÂN 🎉
          </h1>
        </NavLink>
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
        <div className="group">
          <p className="ct">Chương Trình Quay Thưởng - Tri Ân Khách Hàng</p>
        </div>

        <p className="ngay">📅 {moment(ky).format("DD/MM/YYYY")}</p>
        {/* <div>
          <p className="se">Tri Ân Khách Hàng</p>
        </div> */}

        <div
          className="formWrap"
          style={{
            height: ketQua
              ? 0
              : form
              ? "220px"
              : textInput === ""
              ? "220px"
              : 0,
          }}
        >
          <form action="">
            <textarea
              placeholder="Khách hàng tham gia quay thưởng"
              value={textInput}
              onChange={handleTextareaChange}
              onBlur={() => {
                setForm(false);

                autoScrollDownThenUp(1, 14);
                setHideMouse(true);
              }}
            />
          </form>
        </div>

        {listKhachHang.length > 0 && !ketQua && (
          <>
            {countdown !== null ? (
              <button className="quay-btn" disabled>
                <span className="spinner" />
                {countdown}
              </button>
            ) : (
              <button className="quay-btn">🎯 Quay thưởng</button>
            )}
          </>
        )}

        {ketQua && (
          <div className="ketQuaWrap">
            <div className="ketQuaCard">
              {/* <p className="ngay">📅 {moment(ky).format("DD/MM/YYYY")}</p> */}
              <p className="ketQuaTitle"> 🎊 Xin Chúc Mừng</p>
              <div className="ketQuaTitle">❤️ Khách hàng trúng thưởng </div>

              <div className="ketQuaTen">
                🧑‍💼 {replaceShortCodes(ketQua.ten)}
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
              <input
                className="soDienThoai"
                type="text"
                placeholder="Số điện thoại"
                value={soDt}
                onChange={(e) => {
                  setSoDt(e.target.value.replace(/[^\d ]/g, ""));
                }}
                onBlur={() => {
                  setSoDt(soDt ? `📞 ${soDt}` : "");
                  postDataToBackEnd();
                }}
              />
            </div>
          </div>
        )}

        {listKhachHang.length > 0 && !ketQua && (
          <div style={{ marginTop: "10px" }} className="content">
            <h4>DANH SÁCH KHÁCH HÀNG THAM GIA QUAY THƯỞNG</h4>
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
                  {/* <th
                    style={{
                      border: "1px solid #009688",
                      padding: "8px",
                      backgroundColor: "#009688",
                      color: "white",
                    }}
                  >
                    Số điện thoại
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {listKhachHang.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor:
                        item.ten === ketQua?.ten ? "#ff4081" : "",
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
                      {replaceShortCodes(item.ten)}
                    </td>
                    {/* <td
                      style={{
                        // border: "1px solid #009688",
                        padding: "10px 8px",
                        color: item.ten === ketQua?.ten ? "white" : "#009688",
                      }}
                    >
                      {item.soDienThoai}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuayThuong;
