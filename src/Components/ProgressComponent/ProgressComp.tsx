import React, { useEffect, useState } from "react";
import styles from "./Progress.module.css";
import { Calendar } from "primereact/calendar";
import ProgressEmp from "./ProgressEmp";
import ProgressService from "../ApiServices/Progress";
import { ProgressEditBody, ProgressItem } from "../Models/Models";

const ProgressComp = () => {
  const progressService: ProgressService = new ProgressService();
  const [fromDate, setFromDate] = useState<any>("");
  const [toDate, setToDate] = useState<any>("");
  const [progressData, setProgressData] = useState([]);
  function getProgressData() {
    let userID = {
      moderatorID: JSON.parse(localStorage.getItem("user") || "")?.userID,
      page: 1,
      pageSize: 8,
    };

    progressService
      .getAllProgress("/api/Progress/getAdminProgress", userID)
      .then((res) => {
        if (res.data) {
          setProgressData(res.data);
          console.log(progressData);
        } else {
        }
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateValue(progressItems: ProgressItem[], quarterID: number) {
    let body: ProgressEditBody = { progress: progressItems };
    let apiName: string = `/api/Progress/UpdateCertainEmpProgress?quarterID=${quarterID}`;
    progressService
      .updateCertainProgress(apiName, body)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getProgressData();
  }, []);
  return (
    <section
      className={
        "h-100 rounded-2 d-flex flex-column justify-content-between " +
        styles.section_container
      }
    >
      <div
        className={
          "p-3 w-100 d-flex justify-content-between align-items-center " +
          styles.sectionHeadline
        }
      >
        <div>
          <h2 className="m-3 ">Employees Progress</h2>
        </div>
        <div
          className={
            "d-flex align-items-center justify-content-end gap-2 " +
            styles.searchContainer
          }
        >
          <div>
            <Calendar
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              showButtonBar
              showIcon
            />
          </div>
          <div>
            <Calendar
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              showButtonBar
              showIcon
            />
          </div>
        </div>
      </div>
      <div className={styles.body_container}>
        <div className={"px-4 py-2 gap-2 " + styles.progressContainer}>
          {progressData.length ? (
            progressData.map((progressItem, idx) => (
              <ProgressEmp
                key={idx}
                item={progressItem}
                updateValue={updateValue}
              />
            ))
          ) : (
            <div
              className={
                "my-5 py-5 position-absolute w-100 top-50  " +
                styles.loaderContainer
              }
            >
              <div className={styles.loader}></div>
            </div>
          )}
        </div>
      </div>
      <div className="h-25"></div>
    </section>
  );
};

export default ProgressComp;
