import { createSlice } from "@reduxjs/toolkit";
import {  OrdersPageState } from "../../../lib/types/screen";
import { Member } from "../../../lib/types/member";

// Boshlang'ich holat
const initialState: OrdersPageState = {
    pausedOrders : [],
    processOrders : [],
    finishedOrders : [],
};

// Slice yaratish
const ordersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setPausedOrders: (state, action) => {
      state.pausedOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});

// Actionlarni export qilish
export const { setPausedOrders, setProcessOrders, setFinishedOrders } =
ordersPageSlice.actions;

// Reducerni export qilish
const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;
