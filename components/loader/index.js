import React, { useEffect, useState } from "react";
import style from "../../styles/preload.module.scss";

const Preloader = () => {
  const [visibleLoader, setVisibleLoader] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setVisibleLoader(true), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div id="preloader" className={visibleLoader ? style.load_hide : ""}>
      <div className="book">
        <div className="inner">
          <div className="left"></div>
          <div className="middle"></div>
          <div className="right"></div>
        </div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Preloader;
