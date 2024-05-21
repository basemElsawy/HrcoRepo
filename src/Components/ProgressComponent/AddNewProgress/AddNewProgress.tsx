import React, { useContext, useState } from "react";
import styles from "./Progress.module.css";
import { useFieldArray, useForm } from "react-hook-form";
import unknown from "../../../assets/Unknown_person.jpg";
import { Calendar } from "primereact/calendar";
import { ToastContainer, toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import {
  ModalSelectOptions,
  ProgressItem,
  QuarterEvaluation,
  Users,
} from "../../Models/Models";
import { mainContext } from "../../GlobalContext/globalContext";
import ProgressService from "../../ApiServices/Progress";

const AddNewProgress = () => {
  const [isToasting, setToasting] = useState<boolean>(false);
  const _progressService = new ProgressService();
  const [image, setImage] = useState<string>("");
  const form = useForm<QuarterEvaluation>({
    defaultValues: {
      currentYear: "",
      from: "",
      to: "",
      progress: [
        {
          progressName: "",
          progressValue: 0,
        },
      ],
      moderatorID: "",
      userID: "",
    },
  });
  const { register, control, formState, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    name: "progress",
    control,
  });

  const { allUsersData } = useContext<any>(mainContext);
  function addNewProgress() {
    control._getFieldArray("progress").length < 6 &&
      append({
        progressName: "",
        progressValue: 0,
      });

    console.log(control._fields);
  }
  function imageHandler(e: any) {
    let employeeImage = allUsersData.find(
      (users: ModalSelectOptions) => e.target.value == users.userID
    );
    setImage(employeeImage.image);
  }
  function onSubmit(data: any) {
    data.moderatorID = JSON.parse(localStorage.getItem("user") || "").userID;
    // console.log(data);

    _progressService
      .addNewProgress("/api/Progress/AddNewQuarterEval", data)
      .then((response) => {
        setToasting(true);
        if (response?.isSuccess) {
          toast(response?.message);
          setToasting(false);
          control._reset();
        } else {
          toast(response?.message, {
            style: {
              color: "red",
            },
          });
          setToasting(false);
          form.reset();
          control._reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section
      className={styles.sectionContainer + " h-100  bg-white  rounded-2"}
    >
      <div className={styles.Header}>
        <div className={styles.headline}>
          <h2 className=" p-4 ">Add New Evaluation</h2>
        </div>
      </div>
      <div className={styles.formContainer}>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex w-100 gap-3 flex-column align-items-center justify-content-center"
        >
          <div className={styles.userImage}>
            <img src={image.length ? image : unknown} alt="" />
          </div>
          <div
            className={
              "d-flex w-100 align-items-center justify-content-center gap-3 " +
              styles.inputs_container
            }
          >
            <div className="">
              <select
                defaultValue={"employees"}
                className="form-control"
                id=""
                {...register("userID", {
                  required: "Choose an employee to evaluate",

                  onChange: imageHandler,
                })}
              >
                <option value="" selected disabled>
                  Choose an Employee
                </option>
                {allUsersData &&
                  allUsersData.map((user: ModalSelectOptions, idx: number) => {
                    return <option value={user.userID}>{user.option}</option>;
                  })}
              </select>
            </div>
            <div className="prog-calendar">
              <Calendar
                {...register("from")}
                className="w-100"
                placeholder="From Date"
                dateFormat="dd/mm/yy"
                showIcon
              />
            </div>
            <div className="prog-calendar">
              <Calendar
                showIcon
                className="w-100 "
                placeholder="To Date"
                {...register("to")}
                dateFormat="dd/mm/yy"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Current Year"
                className="form-control "
                {...register("currentYear", {
                  required: "Year of evaluation Required",
                })}
              />
            </div>
          </div>
          <div
            className={
              styles.progresses +
              " d-flex align-items-center justify-content-start gap-3 w-100 flex-column"
            }
          >
            <div className="d-flex w-100 justify-content-between align-items-center gap-4">
              <h4 className="fs-6 m-0 p-0 text-muted">
                Add Evaluation Progress
              </h4>
              <button
                type="button"
                onClick={addNewProgress}
                className="btn  add-new new-prog"
              >
                Add +
              </button>
            </div>
            <div className={styles.progressContainer + " w-100"}>
              {fields.map((prog: ProgressItem, idx: number) => {
                return (
                  <div className="d-flex gap-2 w-100 align-items-center justify-content-center  position-relative">
                    {idx > 0 && (
                      <div
                        onClick={() => {
                          remove(idx);
                        }}
                        className={
                          "btn btn-danger position-absolute " + styles.closeBtn
                        }
                      >
                        x
                      </div>
                    )}
                    <div className="position-relative w-100">
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={"Progress Name"}
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
                        placeholder="Progress Name"
                      />
                      <div className={styles.errorMsg}>
                        {formState["errors"]?.progress?.[idx]?.progressName
                          ?.message || ""}
                      </div>
                    </div>
                    <div className="position-relative">
                      <input
                        className="form-control"
                        type="number"
                        {...register(
                          `progress[${idx}].progressValue` as const,
                          {
                            required: "this field is required",
                          }
                        )}
                        defaultValue={"Progress Value"}
                      />
                      <div className={styles.errorMsg}>
                        {formState["errors"]?.progress?.[idx]?.progressValue
                          ?.message || ""}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-100 d-flex justify-content-end ">
            <button
              disabled={!formState.isValid}
              className="w-auto btn btn-primary "
            >
              submit Evaluation
            </button>
          </div>
        </form>
      </div>
      {isToasting ? <ToastContainer /> : ""}
    </section>
  );
};

export default AddNewProgress;
