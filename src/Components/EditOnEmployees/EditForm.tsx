import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../../assets/Unknown_person.jpg";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./EditStyling.module.css";
import { mainContext } from "../GlobalContext/globalContext";
import { Inputs, Roles, Users } from "../Models/Models";
const EditForm = (props: any) => {
  const { roles }: any = useContext(mainContext);

  const { register, handleSubmit } = useForm<Inputs>();

  const [imageSelected, imageSetter] = useState<any>();
  const [toBase64, setToBase64] = useState<any>();

  const setImageHandler = (e: any) => {
    imageConverterHandler(e.target.files[0]);
  };

  const imageConverterHandler = (file: any) => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setToBase64(fileReader.result);
    };
  };

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    props.updateUserFunc(data);
  };

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className={styles.imageInput}>
        <label htmlFor="add_image">
          <img src={toBase64 ? toBase64 : Image} alt="" />
          <i className="fa-solid fa-plus"></i>
        </label>
        <input
          type="file"
          id="add_image"
          onChange={setImageHandler}
          style={{ display: "none" }}
        />
      </div>
      <div className={styles.inputs_container}>
        <div>
          <input
            type="text"
            placeholder="Employee Full Name"
            defaultValue={props.user?.fullName}
            {...register("FullName")}
            required
          />
        </div>
        <div>
          <input
            type="text"
            defaultValue={props.user?.title}
            placeholder="Employee title"
            {...register("title")}
            required
          />
        </div>
        <div>
          <input
            type="text"
            defaultValue={props.user?.email}
            placeholder="email"
            required
            {...register("email")}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Employee Password"
            {...register("Password")}
            required
          />
        </div>
        <div>
          <select
            defaultValue={props.user?.roleID}
            {...register("RoleID")}
            name="Role"
            id=""
          >
            {roles.map((role: Roles) => {
              return (
                <option key={role.id} value={role.id}>
                  {role.description}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className={styles.submit_btn}>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};

export default EditForm;
