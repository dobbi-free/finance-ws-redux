import React from "react";
import style from "../TickItem/tick-item.module.css";

export const ChangePriceItem = ({ change, prevChange, symbol }) => {
  return (
    <div className={style.change_wrapper}>
      {!!change && (
        <div className={change > 0 ? style.change_plus : style.change_minus}>
          {change > 0 ? `+${change}${symbol}` : `${change}${symbol}`}
        </div>
      )}
      {!!prevChange && (
        <div
          className={
            prevChange > 0 ? style.change_plus_fade : style.change_minus_fade
          }
        >
          {prevChange > 0
            ? `+${prevChange}${symbol}`
            : `${prevChange}${symbol}`}
        </div>
      )}
    </div>
  );
};
