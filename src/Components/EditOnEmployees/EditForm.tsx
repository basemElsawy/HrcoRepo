import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../../assets/Unknown_person.jpg";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./EditStyling.module.css";
import EmployeesService from "../ApiServices/EmployeesService";
import { mainContext } from "../GlobalContext/globalContext";
import { Inputs, Roles, Users } from "../Models/Models";
const EditForm = (props: any) => {
  const employeesService = new EmployeesService();
  const { roles }: any = useContext(mainContext);
  const { id }: any = useParams<string>();
  const [user, setUser] = useState<Users>();
  const { register, handleSubmit } = useForm<Inputs>();
  const [imageSelected, imageSetter] = useState<Blob>();
  const [toBase64, setToBase64] = useState<string | ArrayBuffer | null>();

  const imageConverterHandler = () => {
    if (!imageSelected) return;

    let fileReader = new FileReader();

    fileReader.readAsDataURL(imageSelected);
    fileReader.onloadend = async () => {
      setToBase64(fileReader.result);
      console.log("finished reading");
    };
  };

  const submitHandler: SubmitHandler<Inputs> = (data) => {};

  useEffect(() => {
    employeesService
      .getSpecificUser(id)
      .then((res: Users) => {
        setUser(res);
        props.nameSetter(res.fullName);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className={styles.imageInput}>
        <label htmlFor="add_image">
          <img src={Image} alt="" />
          <i className="fa-solid fa-plus"></i>
        </label>
        <input
          type="file"
          id="add_image"
          onChange={imageConverterHandler}
          style={{ display: "none" }}
        />
      </div>
      <div className={styles.inputs_container}>
        <div>
          <input
            type="text"
            placeholder="Employee Full Name"
            {...register("fullName")}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Employee title"
            {...register("title")}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            required
            {...register("email")}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Employee Password"
            {...register("password")}
            required
          />
        </div>
        <div>
          <select name="Role" id="">
            <option value={undefined} selected disabled>
              Choose Role
            </option>
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
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};

export default EditForm;
