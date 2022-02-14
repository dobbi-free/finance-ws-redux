import React from "react";
import style from "./tick-item.module.css";
import { useSelector } from "react-redux";
import { ChangePriceItem } from "../ChangePriceItem/ChangePriceItem";
import { PriceItem } from "../PriceItem/PriceItem";

export const TickItem = ({
  ticker,
  price,
  change,
  change_percent,
  controlHandler,
  index,
  isPassiveTicker,
}) => {
  const { prevTickers } = useSelector((state) => state.tickers);

  return (
    <>
      <div key={price} className={style.item}>
        <div data-testid={"ticker"} className={style.ticker}>
          {ticker}
        </div>
        <PriceItem price={price} prevPrice={prevTickers[index]?.price} />
        <ChangePriceItem
          change={change}
          prevChange={prevTickers[index]?.change}
          symbol={"$"}
        />
        <ChangePriceItem
          change={change_percent}
          prevChange={prevTickers[index]?.change_percent}
          symbol={"%"}
        />
        <button
          className={isPassiveTicker ? style.button_on : style.button_off}
          onClick={controlHandler}
        >
          {isPassiveTicker ? "Off" : "On"}
        </button>
      </div>
    </>
  );
};
