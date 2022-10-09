import React from "react";
import style from "./index.module.css";
export const NotFound = () => {
  return (
    <div>
      <div id={style.main}>
        <div className={style.fof}>
          <h1 className={style.TextError}>Error 404</h1>
        </div>
      </div>
    </div>
  );
};
