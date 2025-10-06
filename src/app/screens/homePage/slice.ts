import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";
import { Member } from "../../../lib/types/member";

// Boshlang'ich holat
const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

// Slice yaratish
const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

// Actionlarni export qilish
export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;

// Reducerni export qilish
const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
