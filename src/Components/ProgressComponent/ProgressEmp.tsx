import React, { useEffect, useState } from "react";
import styles from "./Progress.module.css";
import { Badge } from "react-bootstrap";
import image from "../../assets/Unknown_person.jpg";
import { ProgressItem, ProgressEntity } from "../Models/Models";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
const ProgressEmp = ({ item, updateValue }: any) => {
  const [show, setShow] = useState(false);
  const [editingBody, setEditing] = useState<ProgressItem | any>({
    progressName: "",
    progressValue: 0,
  });
  const [progressName, progressNameSetter] = useState<string>("");
  const [progressValue, progressValueSetter] = useState<any>("");
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const setEditingBody = (e: any) => {
    setEditing((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(editingBody);
  };

  const [progressItems, setProgressItems] = useState<ProgressItem[] | any[]>(
    item.progress.map(
      ({ progressName, progressValue, ...rest }: ProgressEntity) => ({
        progressName,
        progressValue,
      })
    )
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeProgIndex, setActiveProgIndex] = useState<number>(0);

  const saveChanges = () => {
    console.log(progressItems);

    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function newProgressEditor(event: any, index: number) {
  // }
  function HandleAddNewProgress() {
    console.log(progressItems);
    setProgressItems((prev: ProgressItem | any) => {
      return [...prev, { progressName: "", progressValue: 0 }];
    });
    console.log(progressItems);
  }
  function newProgressSetter(e: any) {
    item.total = 0;

    item.progress[activeProgIndex].progressValue = Number(e.target.value);

    item.progress.forEach((progress: any) => {
      item.total += progress.progressValue;
    });
  }

  function editHandler(progressIndex: number) {
    setIsEditing(true);
    setActiveProgIndex(progressIndex);
  }
  const submitNewValues = () => {
    let newProgress: ProgressItem[] = item.progress.map(
      ({ progressName, progressValue, ...restValues }: ProgressEntity) => ({
        progressName,
        progressValue,
      })
    );

    updateValue(newProgress, item.id);

    setIsEditing(false);
  };

  return (
    <>
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
              <img src={item?.user.image ? item.user.image : image} alt="" />
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
            <button
              className={"btn p-2 border-none progressEmp " + styles.optionBtn}
            >
              <i className="fa-solid  fa-trash "></i>
            </button>
            <button
              onClick={handleShow}
              className={"btn p-2 progressEmp " + styles.optionBtn}
            >
              <i className="fa-solid fa-user-pen"></i>
            </button>
          </div>
        </div>
        <div className={styles.formContainer}>
          <form action="" className={styles.form_container}>
            {item?.progress &&
              item.progress.map((prog: any, idx: number) => {
                return (
                  <div
                    onClick={() => editHandler(idx)}
                    className={styles.formControl}
                  >
                    <label htmlFor="progName">{prog.progressName}</label>
                    <input
                      type="number"
                      minLength={0}
                      maxLength={100}
                      defaultValue={prog.progressValue}
                      onChange={newProgressSetter}
                      id="progName"
                      disabled={!(idx == activeProgIndex && isEditing)}
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
              onClick={submitNewValues}
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
              {item?.total && item.total}
            </p>
          </div>
        </div>
      </section>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit On{" "}
            {item?.user &&
              item.user.fullName
                .split(" ")
                .map((name: string, idx: number) => (idx < 2 ? name : ""))
                .join(" ")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-1 my-2 fs-6">
            <button
              onClick={HandleAddNewProgress}
              className="btn  btn-outline-primary modal-btn"
            >
              Add New
            </button>
          </div>
          <form
            action=""
            className="d-flex flex-column align-items-center justify-content-center gap-2"
          >
            {item?.progress &&
              progressItems.map((prog: ProgressItem, idx) => (
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <input
                    className="form-control text-muted"
                    type="text"
                    name="progressName"
                    onKeyDown={setEditingBody}
                    defaultValue={prog.progressName}
                  />
                  <input
                    className="form-control"
                    type="number"
                    name="progressValue"
                    onKeyDown={setEditingBody}
                    defaultValue={prog.progressValue}
                    placeholder="Progress Value"
                  />
                </div>
              ))}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className={styles.saveChanges} onClick={handleClose}>
            Close
          </button>
          <button className={styles.saveChanges} onClick={saveChanges}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProgressEmp;
