import React, { useState } from "react";
import { toDataURL } from "qrcode";

const QrCode = ({ data }) => {
  const { total, noiDung } = data;
  const vietQRUrl = `https://img.vietqr.io/image/ACB-126079769-compact.png?amount=${total}&addInfo=${noiDung}+'THANH TOAN'&accountName=TRUONG+BUU+NHUT`;

  return (
    <div id="qrCode">
      <img
        style={{ textAlign: "center", margin: "0 auto" }}
        src={vietQRUrl}
        alt="QR chuyển khoản"
        width="200"
      />
    </div>
  );
};

export default QrCode;
