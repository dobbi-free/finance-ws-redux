import React from "react";
import style from "../TickList/tick-list.module.css";
import { TickList } from "../TickList/TickList";

export const TickTable = () => {
  return (
    <div className={style.tick_list}>
      <TickList />
    </div>
  );
};
