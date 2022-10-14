// import React from "react";
// import Loader from "react-spinners/PuffLoader";
// import styles from "../../styles/widgets/loading.module.scss";
// import { css } from "@emotion/react";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

function XLoading({ loading }) {
  if (loading) {
    return (
      <div>
        {/* <Loader color="#000000" loading={loading} css={override} size={150} /> */}
        <div id="preloader">
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
      </div>
    );
  }
  return <></>;
}

export default XLoading;
