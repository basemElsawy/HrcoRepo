import { Route, useNavigate, Routes } from "react-router-dom";
import HomePage from "./Components/Home/HomePage.js";
import LoginComp from "./Components/Authentication/LoginComponent/LoginComp.jsx";
import ProtectedRoute from "./Components/Utils/PrivateRoute.js";
import SideNav from "./Components/SideNav/SideNav.js";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import GlobalContext, {
  mainContext,
} from "./Components/GlobalContext/globalContext.js";
import ShowEmployees from "./Components/ShowEmployees/ShowEmployees.js";
import EditComponent from "./Components/EditOnEmployees/EditComponent.js";
import AllComments from "./Components/AllComments/AllComments.js";
import { jwtDecode } from "jwt-decode";
import Modal from "./Components/Modal/Modal.js";
import { useContext, useEffect } from "react";
function App(props: any) {
  const navigate = useNavigate();
  const employeeState: boolean = true;
  const { modalObject }: any = useContext(mainContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token") || "");
      const decodedToken = jwtDecode(token);
      const nowDate = Math.floor(Date.now() / 1000);
      // console.log(decodedToken.exp);
      let isExpired = decodedToken.exp && decodedToken?.exp < nowDate;
      if (isExpired) {
        localStorage.clear();
      }
    }
  }, []);

  return (
    <>
      <Modal {...modalObject} />
      <ProtectedRoute>
        <main className="main-content">
          <div>
            <SideNav navigator={navigate} />
          </div>

          <div className="content-routes">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/employees" element={<ShowEmployees />} />
              <Route
                path="/Edit/:id"
                element={<EditComponent isNewEmployee={!employeeState} />}
              />
              <Route
                path="/Edit"
                element={<EditComponent isNewEmployee={employeeState} />}
              />
              <Route path="/comments" element={<AllComments />} />
            </Routes>
          </div>
        </main>
      </ProtectedRoute>
      <Routes>
        <Route path="/login" element={<LoginComp navigate={navigate} />} />
      </Routes>
    </>
  );
}

export default App;
