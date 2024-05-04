import React, { useContext, useEffect, useState } from "react";
import styles from "./Progress.module.css";
import { Badge } from "react-bootstrap";
import image from "../../assets/Unknown_person.jpg";
import { ProgressItem, ProgressEntity } from "../Models/Models";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useFieldArray, useForm } from "react-hook-form";
import { mainContext } from "../GlobalContext/globalContext";

const ProgressEmp = ({ item, updateValue }: any) => {
  const [show, setShow] = useState(false);
  const { isLoadingGlobal }: any = useContext(mainContext);
  const form = useForm<any>({
    defaultValues: {
      progress: item.progress.map(
        ({ progressName, progressValue, ...rest }: ProgressEntity) => ({
          progressName,
          progressValue,
        })
      ),
    },
  });
  const { register, control, handleSubmit, formState, getValues } = form;
  const { fields, append, remove } = useFieldArray({
    name: "progress",
    control,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeProgIndex, setActiveProgIndex] = useState<number>(0);

  const saveChanges = (data: any) => {
    let progress = data.progress;
    updateValue(progress, item.id);
    console.log(progress);
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function newProgressSetter(e: any) {
    item.total = 0;

    item.progress[activeProgIndex].progressValue = Number(e.target.value);

    item.progress.forEach((progress: any) => {
      item.total += progress.progressValue;
    });
  }
  function handleErrorState() {
    if (formState.errors) console.log();
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
      {!isLoadingGlobal ? (
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
                className={
                  "btn p-2 border-none progressEmp " + styles.optionBtn
                }
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
      <Modal show={show} onHide={handleClose} centered>
        <form
          onSubmit={handleSubmit(saveChanges)}
          className="d-flex flex-column align-items-center justify-content-center gap-2"
        >
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
            <div className=" my-2 fs-6">
              <button
                onClick={() =>
                  getValues().progress.length < 6 &&
                  append({ progressName: "", progressValue: 0 })
                }
                className="btn m-0 btn-outline-primary modal-btn"
              >
                Add New
              </button>
            </div>
            <div className="w-100 d-flex justify-content-center flex-column align-items-center gap-4">
              {item?.progress &&
                fields.map((prog: any, idx) => (
                  <div
                    key={prog.id}
                    className="d-flex align-items-center position-relative justify-content-center gap-2"
                  >
                    {idx > 0 && (
                      <button
                        className="btn btn-danger removeBtn"
                        onClick={() => remove(idx)}
                      >
                        x
                      </button>
                    )}
                    <div className="position-relative">
                      <input
                        className="form-control text-muted"
                        type="text"
                        {...register(`progress[${idx}].progressName` as const, {
                          required: "Progress Name is Required",
                          minLength: {
                            value: 4,
                            message:
                              "progress evaluation name must be atleast 4 characters",
                          },
                          pattern: {
                            value: /^[a-zA-Z]+$/g,
                            message: "The Evaluation You Entered is Incorrect",
                          },
                        })}
                        defaultValue={prog.progressName}
                      />
                      <span className="errorMessage">
                        {formState.errors?.progress
                          ? formState["errors"].progress[idx]?.progressName
                              ?.message
                            ? formState["errors"].progress[idx]?.progressName
                                ?.message
                            : ""
                          : ""}
                      </span>
                    </div>

                    <input
                      className="form-control"
                      type="number"
                      max={100}
                      min={0}
                      {...register(`progress[${idx}].progressValue` as const, {
                        required: "this field is required",
                      })}
                      defaultValue={prog.progressValue}
                      placeholder="Progress Value"
                    />
                  </div>
                ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className={styles.saveChanges} onClick={handleClose}>
              Close
            </button>
            <button
              className={styles.saveChanges}
              type="submit"
              onClick={handleErrorState}
            >
              Save Changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ProgressEmp;
