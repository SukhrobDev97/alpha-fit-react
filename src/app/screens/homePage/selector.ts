import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

// HomePage state’ni olish
const selectHomePage = (state: AppRootState) => state.homePage;

// Popular dishes uchun selector
export const retrievePopularDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularDishes
);

// New dishes uchun selector
export const retrieveNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newDishes
);

// Top users uchun selector
export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers
);
