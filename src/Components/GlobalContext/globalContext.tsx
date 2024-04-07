import { createContext, useEffect, useState } from "react";
import ApiService from "../ApiServices/ApiServices";
import { GContextModel, Roles } from "../Models/Models";
export const mainContext = createContext(() => {});

const GlobalContext = ({ children }: any) => {
  const apiService: ApiService = new ApiService();
  const [roles, setRoles] = useState<Roles[]>([]);

  useEffect(() => {
    apiService
      .GetMethod("/api/Authentication/getAllRoles")
      .then((res: Roles[]) => {
        setRoles(res);
      })
      .catch((err) => console.log(err));
  }, []);

  let ContextData: GContextModel | any = { roles };

  return (
    <mainContext.Provider value={ContextData}>{children}</mainContext.Provider>
  );
};

export default GlobalContext;
