import { createContext, useEffect, useState } from "react";
import ApiService from "../ApiServices/ApiServices";
import { GContextModel, ModalProps, Roles } from "../Models/Models";
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
  const apiService: ApiService = new ApiService();
  const [roles, setRoles] = useState<Roles[]>([]);
  const [modalObject, setModalObject] = useState(shallowModalProps);

  useEffect(() => {
    apiService
      .GetMethod("/api/Authentication/getAllRoles")
      .then((res: Roles[]) => {
        setRoles(res);
      })
      .catch((err) => console.log(err));
  }, []);

  let ContextData: GContextModel | any = {
    roles,
    setActiveModal,
    isModalActive,
    modalObject,
    setModalObject,
  };

  return (
    <mainContext.Provider value={ContextData}>{children}</mainContext.Provider>
  );
};

export default GlobalContext;
