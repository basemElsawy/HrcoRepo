import { PropsWithRef, useEffect, useState } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import HomePage from "./Components/Home/HomePage.js";
import LoginComp from "./Components/Authentication/LoginComponent/LoginComp.jsx";
import ProtectedRoute from "./Components/Utils/PrivateRoute.js";
import SideNav from "./Components/SideNav/SideNav.js";
import ApiService from "./Components/ApiServices/ApiServices.js";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import GlobalContext from "./Components/GlobalContext/globalContext.js";

function App(props: any) {
  const navigate = useNavigate();

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
