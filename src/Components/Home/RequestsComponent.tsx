import React from "react";
import styles from "./RequestsCompStyles.module.css";
const RequestsComponent = () => {
  return (
    <section className={styles.section_container}>
      <div
        className={
          "d-flex  align-items-center justify-content-between " +
          styles.offcanvas_header
        }
      >
        <div className="text-muted text-small">Showing Requests For Past </div>
        <div className="d-flex align-flex just-content-between btn-group ">
          <button className="btn btn-primary text-small ">Month</button>
          <button className="btn btn-primary text-small">Week</button>
          <button className="btn btn-primary text-small">Day</button>
        </div>
      </div>
    </section>
  );
};

export default RequestsComponent;
