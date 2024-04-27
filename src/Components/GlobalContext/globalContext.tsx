import { createContext, useEffect, useState } from "react";
import ApiService from "../ApiServices/ApiServices";
import {
  GContextModel,
  ModalProps,
  ModalSelectOptions,
  Roles,
  Users,
  UsersPage,
} from "../Models/Models";
import EmployeesService from "../ApiServices/EmployeesService";
export const mainContext = createContext(() => {});
const GlobalContext = ({ children }: any) => {
  const [isModalActive, setActiveModal] = useState<boolean>(false);
  let shallowModalProps: ModalProps = {
    SubmitButton(): void {},

    CloseModal(): void {},

    inputs: [],
    submitButtonText: "",
    headerText: "",
  };
  const empService: EmployeesService = new EmployeesService();
  const apiService: ApiService = new ApiService();
  const [roles, setRoles] = useState<Roles[]>([]);
  const [globalRender, setGlobalRender] = useState<number>(0);
  const [modalObject, setModalObject] = useState(shallowModalProps);
  const [allUsersData, setAllUsers] = useState<ModalSelectOptions[]>([]);
  useEffect(() => {
    apiService
      .GetMethod("/api/Authentication/getAllRoles")
      .then((res: Roles[]) => {
        setRoles(res);
      })
      .catch((err) => console.log(err));
    empService
      .GetAllUsers(1, 30)
      .then((res: UsersPage) => {
        if (res.data) {
          let usersOptions = res.data?.map(
            (user: Users, idx: number): ModalSelectOptions => ({
              id: idx + 1,
              value: user.employeeCode,
              option: user.fullName
                .split(" ")
                .map((name, idx) => {
                  if (idx < 2) return name;
                })
                .join(" "),
            })
          );

          setAllUsers(usersOptions);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  let ContextData: GContextModel | any = {
    roles,
    setActiveModal,
    isModalActive,
    modalObject,
    setModalObject,
    allUsersData,
    globalRender,
    setGlobalRender,
  };

  return (
    <mainContext.Provider value={ContextData}>{children}</mainContext.Provider>
  );
};

export default GlobalContext;
