import React, { useEffect, useRef } from "react";
import { TickItem } from "../TickItem/TickItem";
import socketIOClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTickers,
  toggleTickersIndex,
} from "../../store/action-creators/tickersActionCreator";
import { TickInterval } from "../TickInterval/TickInterval";

export const TickList = () => {
  const dispatch = useDispatch();

  const { tickers } = useSelector((state) => state.tickers);
  const { prevTickers } = useSelector((state) => state.tickers);
  const { passiveTickersIndex } = useSelector((state) => state.tickers);
  const { tickInterval } = useSelector((state) => state.tickers);
  const socketRef = useRef(null);
  const url = "http://localhost:4000";

  useEffect(() => {
    socketRef.current = socketIOClient(url);
    socketRef.current.emit("start", tickInterval);
    socketRef.current.on("ticker", (data) => {
      dispatch(fetchTickers(data));
    });
  }, [tickInterval]);

  const controlHandler = (index) => {
    let newPassiveTickersIndex;
    if (passiveTickersIndex.includes(index)) {
      newPassiveTickersIndex = passiveTickersIndex.filter((el) => el !== index);
    } else {
      newPassiveTickersIndex = [...passiveTickersIndex, index];
    }
    dispatch(toggleTickersIndex(newPassiveTickersIndex));
  };

  const calculateDifference = (el, index) => {
    return {
      change: Math.ceil((el.price - prevTickers[index]?.price) * 100) / 100,
      change_percent:
        Math.ceil(
          ((el.price - prevTickers[index]?.price) / el.price) * 100 * 100
        ) / 100,
    };
  };

  return (
    <>
      <TickInterval socket={socketRef} />
      {tickers.map((el, index) => {
        const { change_percent, change } = calculateDifference(el, index);
        const isPassiveTicker = passiveTickersIndex.includes(index);
        return (
          <TickItem
            index={index}
            key={el.ticker}
            change={change}
            price={el.price}
            change_percent={change_percent}
            ticker={el.ticker}
            controlHandler={() => controlHandler(index)}
            isPassiveTicker={isPassiveTicker}
          />
        );
      })}
    </>
  );
};
