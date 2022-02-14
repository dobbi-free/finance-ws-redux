import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTickInterval } from "../../store/action-creators/tickersActionCreator";
import style from "./tick-interval.module.css";

export const TickInterval = ({ socket }) => {
  const dispatch = useDispatch();
  const [tick, setTick] = useState(1);
  const { tickInterval } = useSelector((state) => state.tickers);
  const onSetInterval = () => {
    if (tick * 1000 !== tickInterval) {
      dispatch(setTickInterval(tick * 1000));
      socket?.current.emit("reset");
    }
  };

  return (
    <>
      <h3>Current interval: {tickInterval / 1000} sec</h3>
      <input
        type="number"
        value={tick}
        onChange={(e) => {
          setTick(e.target.value);
        }}
      />
      <button className={style.button} onClick={onSetInterval}>
        Set Interval
      </button>
    </>
  );
};
