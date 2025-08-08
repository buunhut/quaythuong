import React, { useEffect, useRef, useState } from "react";
import "./home.scss";
import QrCode from "../QrCode";

const listSanPham = [
  { tenSp: "Bình gas Elf 12kg", gia: 320000, dvt: "Bình" },
  { tenSp: "Bình gas SP xám 12kg", gia: 280000, dvt: "Bình" },
  { tenSp: "Bình gas SP đỏ 12kg", gia: 290000, dvt: "Bình" },
  { tenSp: "Bình gas VT đỏ 12kg", gia: 280000, dvt: "Bình" },
  { tenSp: "Bình gas VT Xanh 12kg", gia: 280000, dvt: "Bình" },
  { tenSp: "Bình gas Total 12kg", gia: 280000, dvt: "Bình" },
  { tenSp: "Mì hảo hảo tôm chua cay", gia: 120000, dvt: "Thùng" },
  { tenSp: "Mì Đệ nhất gói 70gr", gia: 120000, dvt: "Thùng" },
  { tenSp: "Mì Đệ nhất gói 70gr", gia: 5000, dvt: "gói" },
  { tenSp: "Mì hảo hảo tôm chua cay", gia: 4000, dvt: "Gói" },
  { tenSp: "Bia Tiger lon 350ml", gia: 380000, dvt: "Thùng" },
  { tenSp: "Bia Heineken lon 350ml", gia: 450000, dvt: "Thùng" },
  { tenSp: "Bột ngọt Vedan bịt 1kg", gia: 20000, dvt: "Bịch" },
  { tenSp: "Nước tương ChinSu chai 500ml", gia: 14000, dvt: "Chai" },
  { tenSp: "Sữa tươi VinaMilk có đường hộp 300ml", gia: 7000, dvt: "hộp" },
  { tenSp: "Sữa tươi VinaMilk không đường hộp 300ml", gia: 7000, dvt: "hộp" },
  { tenSp: "Sữa tươi TH không đường hộp 300ml", gia: 7000, dvt: "hộp" },
  { tenSp: "Sữa tươi TH có đường hộp 300ml", gia: 7000, dvt: "hộp" },
  { tenSp: "Nước giải khát Pepsi lon 330ml", gia: 8000, dvt: "lon" },
  { tenSp: "Nước giải khát Cocacola lon 330ml", gia: 8000, dvt: "lon" },
  { tenSp: "Dầu ăn Tương An chai 1 lít", gia: 38000, dvt: "Chai" },
  { tenSp: "Dầu ăn Tương An chai 500ml", gia: 22000, dvt: "Chai" },
  { tenSp: "Đường cát trắng Biên Hòa bịch 1kg", gia: 28000, dvt: "Bịch" },
  { tenSp: "Đường cát vàng Biên Hòa bịch 1kg", gia: 28000, dvt: "Bịch" },
  { tenSp: "Đường phèn Biên Hòa bịch 1kg", gia: 48000, dvt: "Bịch" },
  { tenSp: "Đường phèn Biên Hòa bịch 500gr", gia: 28000, dvt: "Bịch" },
];

const Home = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Bạn muốn đặt hàng gì?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customerInfo, setCustomerInfo] = useState("");
  const messageEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [isAwaitingCustomerInfo, setIsAwaitingCustomerInfo] = useState(false);

  useEffect(() => {
    document.title = "Đặt Hàng";
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const parseOrders = (text) => {
    const lines = text
      .trim()
      .split("\n")
      .filter((l) => l.trim() !== "");
    const orderMap = new Map();
    let newCustomerInfo = customerInfo;

    // Lấy thông tin khách hàng nếu có
    const infoRegex = /giao cho (.+?)\s*[-–]\s*(\d{8,})/i;
    if (infoRegex.test(lines[0])) {
      const [, name, phone] = lines[0].match(infoRegex);
      newCustomerInfo = `<p><strong>🧑‍💼 </strong> ${name.trim()} | <strong>📞 </strong> ${phone}</p>`;
      lines.shift(); // bỏ dòng này để xử lý sản phẩm bên dưới
    }

    for (let line of lines) {
      const match = line.match(/^(.+?)(?:,\s*(\d+))?$/i);
      if (!match) continue;

      let [_, nameRaw, quantityStr] = match;
      const quantity = quantityStr ? parseInt(quantityStr) : 1;
      const name = nameRaw.trim().toLowerCase();

      const found = listSanPham.find((sp) =>
        name.includes(sp.tenSp.toLowerCase())
      );

      const key = found ? found.tenSp.toLowerCase() : name;

      if (orderMap.has(key)) {
        const existing = orderMap.get(key);
        existing.sl += quantity;
        existing.thanhTien = existing.sl * existing.donGia;
      } else {
        const newItem = {
          tenSp: found ? found.tenSp : nameRaw.trim(),
          dvt: found?.dvt || "?",
          sl: quantity,
          donGia: found?.gia || 0,
          thanhTien: (found?.gia || 0) * quantity,
          notFound: !found,
        };
        orderMap.set(key, newItem);
      }
    }

    const newOrders = Array.from(orderMap.values());
    return { newOrders, newCustomerInfo };
  };

  const renderOrderTable = (orders, customerInfo) => {
    if (!orders.length) return "🛒 Chưa có sản phẩm nào trong đơn hàng.";

    let total = 0;
    const rows = orders.map((item) => {
      const gia = Number(item.donGia) || 0;
      const sl = Number(item.sl) || 1;
      const thanhTien = gia * sl;
      total += thanhTien;

      return `
      <tr>
        <td>${item.tenSp || ""}</td>
        <td>${item.dvt || ""}</td>
        <td >${sl}</td>
        <td style="text-align: right;">${gia.toLocaleString()}</td>
        <td style="text-align: right;">${thanhTien.toLocaleString()}</td>
      </tr>`;
    });

    return `
    ${customerInfo || ""}
    <p>📦 <strong>Đơn hàng của bạn</strong></p>
    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 14px">
      <thead>
        <tr style="background: #eee">
          <th>Tên SP</th>
          <th>ĐVT</th>
          <th>SL</th>
          <th>Giá</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        ${rows.join("")}
        <tr style="font-weight: bold">
          <td colspan="4" align="center">Tổng tiền</td>
          <td style="text-align: right;">${total.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
    //hiện QR ở đây

    ${
      customerInfo
        ? `<p>📞 Chúng tôi sẽ liên hệ xác nhận đơn. Xin cảm ơn!</p>`
        : `<p>📝 Bạn vui lòng cung cấp tên và số điện thoại để hoàn tất đơn hàng.<br/>👉 Ví dụ: Nguyễn Văn A - 0912345678`
    }
  `;
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);

    // Luôn xử lý sản phẩm trước
    const { newOrders, newCustomerInfo } = parseOrders(userInput);
    const validOrders = newOrders.filter((o) => !o.notFound && !o.notValid);

    if (validOrders.length > 0) {
      // Có sản phẩm hợp lệ, tiến hành cộng dồn và cập nhật
      const updatedOrderMap = new Map();

      orders.forEach((item) => {
        updatedOrderMap.set(item.tenSp.toLowerCase(), { ...item });
      });

      validOrders.forEach((item) => {
        const key = item.tenSp.toLowerCase();
        if (updatedOrderMap.has(key)) {
          const existing = updatedOrderMap.get(key);
          existing.sl += item.sl;
          existing.thanhTien = existing.sl * existing.donGia;
          updatedOrderMap.set(key, existing);
        } else {
          updatedOrderMap.set(key, { ...item });
        }
      });

      const updatedOrders = Array.from(updatedOrderMap.values());
      setOrders(updatedOrders);
      if (newCustomerInfo) setCustomerInfo(newCustomerInfo);

      setTimeout(() => {
        const reply = renderOrderTable(
          updatedOrders,
          newCustomerInfo || customerInfo
        );
        setMessages((prev) => [...prev, { sender: "bot", text: reply }]);

        if (!customerInfo && !newCustomerInfo) {
          setTimeout(() => {
            setIsAwaitingCustomerInfo(true);
            textareaRef.current?.focus();
          }, 300);
        }
      }, 300);

      setUserInput("");
      setSuggestions([]);
      return;
    }

    // Nếu không phải sản phẩm mà đang chờ khách nhập thông tin
    if (isAwaitingCustomerInfo) {
      const infoRegex = /(.*?)(?:[-–])\s*(\d{8,})/i;
      const match = userInput.match(infoRegex);

      if (match) {
        const [, name, phone] = match;
        const newInfo = `<p><strong>🧑‍💼 ${name.trim()}</strong> | 📞 ${phone}</p>`;
        setCustomerInfo(newInfo);
        setIsAwaitingCustomerInfo(false);

        setTimeout(() => {
          const reply = renderOrderTable(orders, newInfo);
          setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
        }, 300);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "❗Vui lòng nhập đúng định dạng: <em>Nguyễn Văn A - 0912345678</em>",
          },
        ]);
      }

      setUserInput("");
      return;
    }

    // Nếu không hợp lệ
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text:
          "⚠️ Xin lỗi, chúng tôi không tìm thấy sản phẩm bạn yêu cầu trong danh sách.\n" +
          "👉 Bạn vui lòng nhập sản phẩm khác.",
      },
    ]);
    setUserInput("");
    setSuggestions([]);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    const lastLine = value.trim().split("\n").pop().toLowerCase();
    if (!lastLine) {
      setSuggestions([]);
      return;
    }

    const gợiÝ = listSanPham.filter((sp) =>
      sp.tenSp.toLowerCase().includes(lastLine)
    );
    //   .slice(0, 5);
    setSuggestions(gợiÝ);
  };

  const handleSuggestionClick = (item) => {
    const lines = userInput.trim().split("\n");
    lines[lines.length - 1] = item.tenSp + ", ";
    const newInput = lines.join("\n");
    setUserInput(newInput);
    setSuggestions([]);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      //   e.preventDefault(); // Ngăn xuống dòng
    }
  };

  return (
    <div style={{ textAlign: "center" }} id="container">
      <div className="top">
        <h1>🎉 Bách hóa HÂN HÂN 🎉</h1>
        <h3>📞 0919 317 710</h3>
        <p>💬 Chat đặt hàng nhanh chóng!</p>
      </div>
      <QrCode data={{ total: 100000, noiDung: "Chuyen khoan" }} />; 
      <main>
        <div className="chatBox">
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.sender === "bot" ? "left" : "right",
                margin: "5px 0",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: msg.sender === "bot" ? "#f0f0f0" : "#d1e7dd",
                  padding: "8px 12px",
                  borderRadius: "15px",
                  maxWidth: "100%",
                  whiteSpace: "pre-wrap",
                }}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              ></span>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
        <div className="textArea">
          <div style={{ display: "flex", gap: "5px" }}>
            <textarea
              ref={textareaRef}
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Gõ sản phẩm, ví dụ: bia tiger, 2"
              style={{
                flex: 1,
                padding: "8px",
                height: "100px",
                fontSize: "15px",
              }}
            />
            <button onClick={handleSend} style={{ padding: "8px 12px" }}>
              Gửi
            </button>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="suggestions">
            <strong>Gợi ý:</strong>
            {suggestions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSuggestionClick(item)}
                style={{
                  cursor: "pointer",
                  padding: "4px",
                  borderBottom: "1px solid #eee",
                }}
                className="hoverable"
              >
                {item.tenSp} - {item.gia.toLocaleString()}đ / {item.dvt}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
