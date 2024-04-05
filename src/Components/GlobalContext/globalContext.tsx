import { createContext, useEffect, useState } from "react";
import ApiService from "../ApiServices/ApiServices";
export const mainContext = createContext(() => {});

const GlobalContext = ({ children }: any) => {
  const apiService: ApiService = new ApiService();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    apiService
      .GetMethod("/api/Authentication/getAllRoles")
      .then((res: any) => {
        setRoles(res);
      })
      .catch((err) => console.log(err));
  }, []);

  let ContextData = { roles };

  return (
    <mainContext.Provider value={ContextData}>{children}</mainContext.Provider>
  );
};

export default GlobalContext;
