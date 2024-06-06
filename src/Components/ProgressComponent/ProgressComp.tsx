import React, { useContext, useEffect, useState } from "react";
import styles from "./Progress.module.css";
import { Calendar } from "primereact/calendar";
import ProgressEmp from "./ProgressEmp";
import ProgressService from "../ApiServices/Progress";
import { ProgressEditBody, ProgressItem } from "../Models/Models";
import { mainContext } from "../GlobalContext/globalContext";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const ProgressComp = () => {
  const progressService: ProgressService = new ProgressService();
  const [isToasting, setToasting] = useState<boolean>(false);
  const [dateObject, SetDateObject] = useState<{
    fromDate: string;
    toDate: string;
  }>({
    fromDate: "",
    toDate: "",
  });

  const [progressData, setProgressData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagingData, setPagingData] = useState<any>({});
  const { isLoadingGlobal, setIsLoadingGlobal } = useContext<any>(mainContext);
  function getProgressData() {
    let userID = {
      moderatorID: JSON.parse(localStorage.getItem("user") || "")?.userID,
      page: currentPage,
      pageSize: 4,
    };

    progressService
      .getAllProgress("/api/Progress/getAdminProgress", userID)
      .then((res) => {
        if (res.data) {
          setPagingData(res);
          setProgressData(res.data);
          console.log(progressData);
          setIsLoadingGlobal(false);
        } else {
        }
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function searchByDate() {
    setIsLoadingGlobal(true);
    setCurrentPage(1);
    setToasting(true);

    let RequestBody = {
      moderatorID: JSON.parse(localStorage.getItem("user") || "")?.userID,
      ...dateObject,
      currentYear: new Date().getFullYear(),
      page: currentPage,
      pageSize: 4,
    };

    progressService
      .searchProgressByDate("/api/Progress/SearchSpecificByDate", RequestBody)
      .then((res) => {
        setToasting(true);
        if (res.data) {
          toast("Data retrieved successfully");
          setPagingData(res);
          setProgressData(res.data);
          setToasting(false);
          setIsLoadingGlobal(false);
        } else {
          toast("no search data found");
          setToasting(false);
          getProgressData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateValue(progressItems: ProgressItem[], quarterID: number) {
    setIsLoadingGlobal(true);
    let body: ProgressEditBody = { progress: progressItems };
    let apiName: string = `/api/Progress/UpdateCertainEmpProgress?quarterID=${quarterID}`;
    progressService
      .updateCertainProgress(apiName, body)
      .then((res) => {
        console.log(res);
        getProgressData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function nextPageHandler() {
    setCurrentPage((prev) => {
      if (prev == pagingData?.pageCount) {
        return prev;
      }

      return prev + 1;
    });
  }

  function prevPageHandler() {
    setCurrentPage((prev) => {
      if (prev == 1) {
        return prev;
      }

      return prev - 1;
    });
  }

  useEffect(() => {
    setIsLoadingGlobal(true);
    getProgressData();
  }, [currentPage]);

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
              placeholder="From Date"
              onChange={(e) =>
                SetDateObject((prev: any) => ({
                  ...prev,
                  fromDate: e.target.value,
                }))
              }
              showButtonBar
              showIcon
            />
          </div>
          <div>
            <Calendar
              placeholder="To Date"
              onChange={(e) =>
                SetDateObject((prev: any) => ({
                  ...prev,
                  toDate: e.target.value,
                }))
              }
              showButtonBar
              showIcon
            />
          </div>
          <button
            onClick={searchByDate}
            className="btn btn-outline-primary p-1 px-2 glass"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <NavLink
            to={"add-new"}
            className="btn btn-primary py-1 px-2 new-prog "
          >
            Add New
          </NavLink>
        </div>
      </div>
      <div className={styles.body_container}>
        <div className={"px-4 py-2 gap-2 " + styles.progressContainer}>
          {progressData.length && !isLoadingGlobal ? (
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
      <div className={styles.pagination + " p-4"}>
        <button className={styles.pageHandlers} onClick={prevPageHandler}>
          <i className="fa-solid fa-caret-left"></i>
          <p>Prev</p>
        </button>

        <button className={styles.pageHandlers} onClick={nextPageHandler}>
          <p>Next</p>
          <i className="fa-solid fa-caret-right"></i>
        </button>
      </div>
      {isToasting ? <ToastContainer /> : ""}
    </section>
  );
};

export default ProgressComp;
