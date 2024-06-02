import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Image from "../../assets/Unknown_person.jpg";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./EditStyling.module.css";
import { mainContext } from "../GlobalContext/globalContext";
import {
  Inputs,
  PropsForUpdateForm,
  Role,
  Roles,
  Users,
  UsersPatch,
} from "../Models/Models";
import EmployeesService from "../ApiServices/EmployeesService";
import { toast } from "react-toastify";
const EditForm = (props: PropsForUpdateForm) => {
  const { roles }: any = useContext(mainContext);
  const employeeService = new EmployeesService();
  const location = useLocation();
  const [employeeCode, setNewCode] = useState<string | number | null>(null);
  const { register, handleSubmit } = useForm<Inputs>();
  const [role, setRole] = useState<number>(0);
  const [imageSelected, imageSetter] = useState<any>();
  const [toBase64, setToBase64] = useState<any>();

  const setImageHandler = (e: any) => {
    imageConverterHandler(e.target.files[0]);
  };
  useEffect(() => {
    setToBase64(props.user?.image);
  }, [props.user?.image]);

  const imageConverterHandler = (file: any) => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = () => {
      setToBase64(fileReader.result);
    };
  };
  const employeeCodeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCode(e.target.value);
  };
  const roleHandler = (e: any) => {
    setRole(e.target.value);
    console.log(role);
  };
  const addNewMemberHandler: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log(data);
    const newUserData: Inputs = {
      ...data,
      image: toBase64,
      RoleID: role,
      EmployeeCode: employeeCode,
    };
    let isUserAlreadySet: boolean = true;

    await employeeService
      .getSpecificUser(newUserData.EmployeeCode)
      .then((response: Users) => {
        isUserAlreadySet = true;
        toast("Employee With This Code already exists");
      })
      .catch((error) => {
        isUserAlreadySet = false;
        console.log(error);
      });
    if (!isUserAlreadySet) {
      props.addNewMember(newUserData);
    }
  };

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    let nullifiedData: Inputs;
    console.log(data.RoleID);
    for (let key in data) {
      if (data[key] === "") {
        data[key] = null;
      }
    }

    nullifiedData = { ...data, image: toBase64, RoleID: role };

    props.updateUserFunc(nullifiedData);
  };

  if (!props.isNewEmployee) {
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
            />
          </div>
          <div>
            <input
              type="text"
              defaultValue={props.user?.title}
              placeholder="Employee title"
            />
          </div>
          <div>
            <input
              type="text"
              defaultValue={props.user?.email}
              placeholder="email"
              {...register("email")}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Employee Password"
              {...register("Password")}
            />
          </div>
          <div>
            <input
              type="text"
              defaultValue={props.user?.phoneNumber}
              placeholder="Employee Phone Number"
              {...register("phoneNumber")}
            />
          </div>
          <div>
            <select onChange={roleHandler} required id="">
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
  } else {
    return (
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(addNewMemberHandler)}
      >
        <div className={styles.imageInput}>
          <label htmlFor="add_image">
            <img src={toBase64 ? toBase64 : Image} alt="" />
            <i className="fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="add_image"
            required
            onChange={setImageHandler}
            style={{ display: "none" }}
          />
        </div>
        <div className={styles.inputs_container}>
          <div>
            <input
              type="number"
              required
              placeholder="Employee Code"
              {...(register("EmployeeCode"),
              {
                onChange: employeeCodeHandler,
              })}
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="Employee Full Name"
              defaultValue={props.user?.fullName}
              {...register("FullName")}
            />
          </div>
          <div>
            <input
              type="text"
              required
              defaultValue={props.user?.title}
              placeholder="Employee title"
              {...register("title")}
            />
          </div>
          <div>
            <input
              type="text"
              required
              defaultValue={props.user?.email}
              placeholder="email"
              {...register("email")}
            />
          </div>
          <div>
            <input
              type="password"
              required
              placeholder="Employee Password"
              {...register("Password")}
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="Employee Phone Number"
              {...register("phoneNumber")}
            />
          </div>
          <div>
            <select onChange={roleHandler} required id="">
              <option selected disabled value="">
                Choose A Role
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
        <div className={styles.submit_btn}>
          <button type="submit">submit</button>
        </div>
      </form>
    );
  }
};

export default EditForm;
