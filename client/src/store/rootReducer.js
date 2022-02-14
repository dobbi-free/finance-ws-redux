import { combineReducers } from "@reduxjs/toolkit";
import { tickers } from "./reducers/tickReducer";

export const rootReducer = combineReducers({
  tickers,
});
