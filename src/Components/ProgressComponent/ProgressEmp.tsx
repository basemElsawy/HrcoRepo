import React, { useEffect, useState } from "react";
import styles from "./Progress.module.css";
import { Badge } from "react-bootstrap";
import image from "../../assets/Unknown_person.jpg";
const ProgressEmp = ({ item }: any) => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  useEffect(() => {
    console.log(item);
  }, []);
  return (
    <section
      className={
        "bg-white h-100 p-3 pb-1 d-flex flex-column align-items-center justify-content-between " +
        styles.empProgress_container
      }
    >
      <div
        className={
          "w-100 d-flex align-items-center justify-content-between " +
          styles.progressHeader
        }
      >
        <div
          className={
            "d-flex align-items-center justify-content-between gap-3 " +
            styles.person_details
          }
        >
          <div className={styles.image_container}>
            <img src={image} alt="" />
          </div>
          <div className={styles.nameText}>
            {item?.user?.fullName &&
              item.user.fullName
                .split(" ")
                .map((name: string, idx: number) => (idx < 2 ? name : ""))
                .join(" ")}
          </div>
        </div>
        <div
          className={
            "d-flex justify-content-end align-item-center gap-2 " +
            styles.edit_container
          }
        >
          <button className={"btn " + styles.optionBtn}>
            <i className="fa-solid fa-trash "></i>
          </button>
        </div>
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form_container}>
          {item?.progress &&
            item.progress.map((prog: any) => {
              return (
                <div
                  onClick={() => setIsEditing(true)}
                  className={styles.formControl}
                >
                  <label htmlFor="progName">{prog.progressName}</label>
                  <input
                    type="text"
                    value={prog.progressValue}
                    id="progName"
                    disabled={!isEditing}
                    className=" form-control  text-center"
                  />
                </div>
              );
            })}
        </form>
      </div>
      <div className={"mt-3 " + styles.button_container}>
        <div className={styles.footerBtn}>
          <button
            onClick={() => setIsEditing(false)}
            disabled={!isEditing}
            className={
              !isEditing
                ? "btn btn-outline-secondary "
                : "btn btn-outline-primary "
            }
          >
            Submit
          </button>
        </div>
        <div className={styles.texts}>
          <Badge bg="secondary" className={"px-3 py-2 " + styles.total}>
            Total
          </Badge>
          <p className=" text-center text-secondary">
            {" "}
            {item?.total && item.total}{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProgressEmp;
