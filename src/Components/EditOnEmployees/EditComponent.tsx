import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditStyling.module.css";
import { useContext } from "react";
import { mainContext } from "../GlobalContext/globalContext";
import EditForm from "./EditForm";
import EmployeesService from "../ApiServices/EmployeesService";
import { Inputs, Users, UsersPatch } from "../Models/Models";
import { toast } from "react-toastify";

const shallowUser: Users = {
  id: "",
  fullName: "",
  password: "",
  image: "",
  RoleID: 0,
  Role: { Id: 0, Description: "" },
  phoneNumber: "",
  employeeCode: "",
  title: "",
  email: "",
};

const EditComponent = ({ isNewEmployee }: { isNewEmployee: boolean }) => {
  const employeesService = new EmployeesService();
  const { roles }: any = useContext(mainContext);
  const [nameSetter, setName] = useState<string>();
  const [user, setUser] = useState<Users>(shallowUser);
  const [editData, setEditData] = useState<UsersPatch | undefined>();
  const { id }: any = useParams<string>();

  const navigator = useNavigate();
  useEffect(() => {
    if (!isNewEmployee) {
      employeesService
        .getSpecificUser(id)
        .then((res: Users) => {
          setUser(res);
          setName(res.fullName);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const updateUser = (data: Inputs) => {
    employeesService
      .patchSpecificUser(user?.id, JSON.stringify(data))
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        toast("Successfully Updated");
        navigator("/");
      })
      .catch((err) => console.log(err));
  };
  const addNewMember = (data: Inputs) => {
    console.log(data);
    employeesService
      .addNewUserToTheSystem(JSON.stringify(data))
      .then((response: boolean) => {
        console.log(response);
        toast("successfully added a new member");
        navigator("/employees");
      })
      .finally(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className={styles.main_container}>
      <div>
        {isNewEmployee ? (
          <h2>Adding A New Employee</h2>
        ) : (
          <h2>Edit On {nameSetter?.split(" ")[0]}</h2>
        )}
      </div>
      <div>
        <EditForm
          user={user}
          updateUserFunc={updateUser}
          addNewMember={addNewMember}
          isNewEmployee={isNewEmployee}
        ></EditForm>
      </div>
    </section>
  );
};

export default EditComponent;
