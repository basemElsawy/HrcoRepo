import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./EditStyling.module.css";
import { useContext } from "react";
import { mainContext } from "../GlobalContext/globalContext";
import EditForm from "./EditForm";
import EmployeesService from "../ApiServices/EmployeesService";
import { Inputs, Users, UsersPatch } from "../Models/Models";

const EditComponent = () => {
  const employeesService = new EmployeesService();
  const { roles }: any = useContext(mainContext);
  const [nameSetter, setName] = useState<string>();
  const [user, setUser] = useState<Users>();
  const [editData, setEditData] = useState<UsersPatch | undefined>();
  const { id }: any = useParams<string>();
  useEffect(() => {
    employeesService
      .getSpecificUser(id)
      .then((res: Users) => {
        setUser(res);
        setName(res.fullName);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const updateUser = (data: Inputs) => {
    employeesService
      .patchSpecificUser(user?.id, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className={styles.main_container}>
      <div>
        <h2>Edit On {nameSetter?.split(" ")[0]}</h2>
      </div>
      <div>
        <EditForm user={user} updateUserFunc={updateUser}></EditForm>
      </div>
    </section>
  );
};

export default EditComponent;
