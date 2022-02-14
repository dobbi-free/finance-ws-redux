import React from "react";
import style from "../TickItem/tick-item.module.css";

export const PriceItem = ({ price, prevPrice }) => {
  return (
    <div className={style.price_wrapper}>
      <div className={style.price}>{price}$</div>
      <div className={style.price_fade}>{prevPrice ? `${prevPrice}$` : ""}</div>
    </div>
  );
};

