import React from "react";
import styles from "./RequestsCompStyles.module.css";
const Request = ({ data, updateState, ignoreRequestHandler }: any) => {
  function updateReqState() {
    if (data?.id) {
      updateState(data?.id);
    }
  }
  function ignoreRequest() {
    if (data?.id) {
      ignoreRequestHandler(data?.id);
    }
  }

  return (
    <section className={"d-flex w-100 p-2  " + styles.request_wrapper}>
      <div
        className={
          "d-flex flex-column justify-content-between align-items-center rounded-1 gap-3  p-2 w-100 " +
          styles.request_container
        }
      >
        <div
          className={
            "d-flex w-100  align-items-center justify-content-start gap-2 " +
            styles.userData
          }
        >
          <div className={styles.img_container}>
            <img src={data.user && data?.user.image} alt="" />
          </div>
          <div
            className={
              "d-flex w-100 justify-content-between align-items-center " +
              styles.empName
            }
          >
            <h5 className="fs-6 fw-light">
              {data?.user && data?.user.fullName}
            </h5>
            <p>{data?.requestType && data.requestType.requestName}</p>
          </div>
        </div>
        <div className={"text-start w-100 " + styles.section_body}>
          <p className="w-100 text-start fs- px-2 fw-bold">
            {data && data?.requestTypeDescription}
          </p>
        </div>
        {!data?.isIgnored ? (
          !data?.approvedByHr && !data?.approvedByManager ? (
            <div
              className={
                "d-flex align-items-center justify-content-center align-self-end gap-1 " +
                styles.ignoreBtn
              }
            >
              {!data?.isIgnored && (
                <button className="btn btn-outline-danger d-flex justify-content-between align-items-center rounded-1 gap-2">
                  <div>Ignore</div> <i className="fa-solid fa-dumpster"></i>
                </button>
              )}
              <button
                className="btn btn-outline-success d-flex justify-content-between align-items-center gap-2 rounded-1"
                disabled={data?.isIgnored || data?.approvedByHr}
              >
                <div onClick={updateReqState}>Approve</div>
                <i className="fa-solid fa-check"></i>
              </button>
            </div>
          ) : (
            <div
              className={
                "d-flex justify-content-between align-items-center gap-2 " +
                styles.approved
              }
            >
              <p className="fs-6 text-success">Approved</p>

              <i className="fa-solid fa-check text-success"></i>
            </div>
          )
        ) : (
          <div
            className={
              "d-flex justify-content-between align-items-center gap-2 " +
              styles.approved
            }
          >
            <p className="fs-6 text-danger">Denied</p>

            <i className="fa-solid fa-dumpster text-danger"></i>
          </div>
        )}
      </div>
    </section>
  );
};

export default Request;
