import React, { ChangeEvent } from "react";
import styles from "./RequestsCompStyles.module.css";

import Request from "./Request";
const RequestsComponent = ({
  reqData,
  ignoreRequest,

  updateState,
}: any) => {
  function ignoreRequestHandler(requestID: any) {
    ignoreRequest(requestID);
  }

  function updateReqState(reqID: string | number) {
    updateState(reqID);
  }
  return (
    <section className={"h-100  " + styles.section_container}>
      <div
        className={
          "d-flex flex-column align-items-center justify-content-center " +
          styles.containerBody
        }
      >
        {reqData?.map((data: any, idx: number) => {
          return (
            <Request
              key={idx}
              ignoreRequestHandler={ignoreRequestHandler}
              data={data}
              updateState={updateReqState}
            />
          );
        })}
      </div>
    </section>
  );
};

export default RequestsComponent;
