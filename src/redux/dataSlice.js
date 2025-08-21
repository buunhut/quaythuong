import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listWinner: [
    {
      ngay: "20/08/2025",
      ten: "Anh Phong Bia Số 3",
    },
    {
      ngay: "19/08/2025",
      ten: "Tiến Kế Nho Đc",
    },
    {
      ngay: "18/08/2025",
      ten: "Anh Phong Chuối Chiên Cầu Số 3",
    },
    {
      ngay: "17/08/2025",
      ten: "Chế Quyên Cơm",
    },
    {
      ngay: "16/08/2025",
      ten: "Chị Mỹ Đồng 1",
    },
    {
      ngay: "15/08/2025",
      ten: "Cô Liên Ngang Chùa",
    },
    {
      ngay: "14/08/2025",
      ten: "Cô Xà Ngang Hãng Nước Đá Bs",
    },
  ],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateListWinner(state, action) {
      state.login = action.payload;
    },
  },
});

export const { updateListWinner } = dataSlice.actions;
export default dataSlice.reducer;
