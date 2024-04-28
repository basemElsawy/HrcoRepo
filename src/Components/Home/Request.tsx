import React from "react";
import styles from "./RequestsCompStyles.module.css";
const Request = (props: any) => {
  return (
    <section className={"d-flex w-100 " + styles.request_wrapper}>
      <div
        className={
          "d-flex justify-content-between align-items-center " +
          styles.requestHeader
        }
      >
        <div className="">
          <img src="" alt="" />
        </div>
        <div className="">
          <button>Ignore</button>
        </div>
      </div>
    </section>
  );
};

export default Request;
