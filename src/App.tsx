import { Route, useNavigate, Routes } from "react-router-dom";
import HomePage from "./Components/Home/HomePage.js";
import LoginComp from "./Components/Authentication/LoginComponent/LoginComp.jsx";
import ProtectedRoute from "./Components/Utils/PrivateRoute.js";
import SideNav from "./Components/SideNav/SideNav.js";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import GlobalContext from "./Components/GlobalContext/globalContext.js";
import ShowEmployees from "./Components/ShowEmployees/ShowEmployees.js";
import EditComponent from "./Components/EditOnEmployees/EditComponent.js";

function App(props: any) {
  const navigate = useNavigate();
  const employeeState: boolean = true;

  return (
    <>
      <GlobalContext>
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
              </Routes>
            </div>
          </main>
        </ProtectedRoute>
        <Routes>
          <Route path="/login" element={<LoginComp navigate={navigate} />} />
        </Routes>
      </GlobalContext>
    </>
  );
}

export default App;
