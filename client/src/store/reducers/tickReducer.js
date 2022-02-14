import { createReducer } from "@reduxjs/toolkit";
import {
  fetchTickers,
  setTickInterval,
  toggleTickersIndex,
} from "../action-creators/tickersActionCreator";

const initialState = {
  tickers: [],
  prevTickers: [],
  passiveTickersIndex: [],
  tickInterval: 5000,
};

export const tickers = createReducer(initialState, (builder) =>
  builder
    .addCase(fetchTickers, (state, action) => {
      state.passiveTickersIndex.forEach((index) => {
        action.payload.data[index] = state.tickers[index];
        state.tickers[index] = state.prevTickers[index];
      });
      state.prevTickers = state.tickers.reduce(
        (acc, el, index) => [
          ...acc,
          {
            ...el,
            change:
              Math.ceil((el?.price - state.prevTickers[index]?.price) * 100) /
              100,
            change_percent:
              Math.ceil(
                ((el?.price - state.prevTickers[index]?.price) / el?.price) *
                  100 *
                  100
              ) / 100,
          },
        ],
        []
      );
      state.tickers = action.payload.data;
    })
    .addCase(toggleTickersIndex, (state, action) => {
      state.passiveTickersIndex = action.payload.passiveTickersIndex;
    })
    .addCase(setTickInterval, (state, action) => {
      state.tickInterval = action.payload.tickInterval;
    })
);
