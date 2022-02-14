const { createAction } = require("@reduxjs/toolkit");
export const fetchTickers = createAction("fetchAction", (data) => {
  return {
    payload: { data },
  };
});

export const toggleTickersIndex = createAction(
  "toggleTickersIndex",
  (passiveTickersIndex) => {
    return {
      payload: { passiveTickersIndex },
    };
  }
);
export const setTickInterval = createAction(
  "setTickInterval",
  (tickInterval) => {
    return {
      payload: { tickInterval },
    };
  }
);
