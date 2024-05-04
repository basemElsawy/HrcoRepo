import React, { useContext, useState } from "react";
import styles from "./Progress.module.css";
import { useFieldArray, useForm } from "react-hook-form";
import unknown from "../../../assets/Unknown_person.jpg";
import {
  ModalSelectOptions,
  ProgressItem,
  QuarterEvaluation,
} from "../../Models/Models";
import { mainContext } from "../../GlobalContext/globalContext";

const AddNewProgress = () => {
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
  // const [newProgressArray, setNewProgress] = useState([
  //   { progressName: "", ProgressValue: 0 },
  // ]);
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
  function onSubmit() {}

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
          className="d-flex w-100 gap-5 flex-column align-items-center justify-content-center"
        >
          <div className={styles.userImage}>
            <img src={unknown} alt="" />
          </div>
          <div
            className={
              "d-flex w-100 align-items-center justify-content-center gap-2 " +
              styles.inputs_container
            }
          >
            <div className="">
              <select
                defaultValue={"employees"}
                className="form-control"
                id=""
                {...register("userID", { onChange: () => {} })}
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
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="From Date"
              />
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="To Date"
              />
            </div>
          </div>
          <div
            className={
              styles.progresses +
              " d-flex align-items-center justify-content-start gap-3 w-100 flex-column"
            }
          >
            <div className="d-flex w-100 justify-content-between align-items-center gap-2">
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
                  <div className="d-flex gap-2 w-100 align-items-center justify-content-center">
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
                    {formState["errors"]?.progress
                      ? formState["errors"]?.progress[idx]?.progressName
                          ?.message
                        ? formState["errors"]?.progress[idx]?.progressName
                            ?.message
                        : ""
                      : ""}

                    <input
                      className="form-control"
                      type="number"
                      {...register(`progress[${idx}].progressValue` as const, {
                        required: "this field is required",
                      })}
                      defaultValue={"Progress Value"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-100">
            <button className="w-100 btn btn-primary ">
              submit Evaluation
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewProgress;
