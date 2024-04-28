import React from "react";
import styles from "./RequestsCompStyles.module.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const RequestsComponent = (props: any) => {
  return (
    <section className={"h-100   " + styles.section_container}>
      <div
        className={
          "d-flex  align-items-start w-100 justify-content-between flex-column " +
          styles.offcanvas_header
        }
      >
        <div className="text-muted text-small d-flex  justify-content-start align-items-center gap-2">
          <div className="mx-1 p-1 ">Filter Requests By</div>
        </div>
        <div className="d-flex w-100 align-flex just-content-between btn-group ">
          <button className="btn btn-primary text-small ">Month</button>
          <button className="btn btn-primary text-small">Week</button>
          <button className="btn btn-primary text-small">Day</button>
          <OverlayTrigger
            placement="top"
            overlay={(props: any) => (
              <Tooltip id="button-tooltip" {...props}>
                Submitted Requests
              </Tooltip>
            )}
          >
            <button className="btn btn-primary text-small">
              <i className="fa-solid fa-check"></i>
            </button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={(props: any) => (
              <Tooltip id="button-tooltip" {...props}>
                Ignored Requests
              </Tooltip>
            )}
          >
            <button className="btn btn-primary text-small">
              <i className="fa-solid fa-dumpster"></i>
            </button>
          </OverlayTrigger>
        </div>
      </div>
      <div
        className={
          "d-flex flex-column align-items-center justify-content-center " +
          styles.containerBody
        }
      ></div>
    </section>
  );
};

export default RequestsComponent;
